import { NextRequest, NextResponse } from 'next/server';

// In-memory chat history
const userChats: Record<
  string,
  { role: 'user' | 'assistant'; content: string }[]
> = {};

function appendMessage(
  userId: string,
  role: 'user' | 'assistant',
  content: string
) {
  if (!userChats[userId]) userChats[userId] = [];
  userChats[userId].push({ role, content });
  if (userChats[userId].length > 3) userChats[userId].shift(); // keep last 3
}

// Clean & format ML response for WhatsApp
function formatForWhatsApp(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold markers
    .replace(/\*(.*?)\n/g, '- $1\n') // convert '*' lists to '-'
    .replace(/\n{2,}/g, '\n') // collapse multiple newlines
    .replace(/ {2,}/g, ' ') // remove extra spaces
    .trim();
}

// Split long messages into WhatsApp-safe chunks (~4000 chars)
function splitLongMessage(text: string, chunkSize = 4000): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize;
  }
  return chunks;
}

// Call ML backend
async function getBotReply(
  messages: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  try {
    const response = await fetch('https://rag-faq-algo.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('❌ Chat API error:', response.status, text);
      return 'Sorry, something went wrong.';
    }

    const data = await response.json();
    console.log('✅ Chat API response:', data);

    return data?.message?.content || 'Sorry, something went wrong.';
  } catch (err) {
    console.error('❌ Error calling chat API:', err);
    return 'Sorry, something went wrong.';
  }
}

// GET = Webhook verification
export async function GET(req: NextRequest) {
  const verifyToken = process.env.VERIFY_TOKEN || 'mybizbot123';
  const url = new URL(req.url);

  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ Webhook verified');
    return new Response(challenge, { status: 200 });
  }

  return new Response('Verification failed', { status: 403 });
}

// POST = Incoming WhatsApp messages
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('📩 Incoming:', JSON.stringify(body, null, 2));

  const change = body.entry?.[0]?.changes?.[0];
  const message = change?.value?.messages?.[0];
  const metadata = change?.value?.metadata;

  if (!message || !metadata) return NextResponse.json({ status: 'ignored' });

  const userId = message.from;
  const userText = message.text?.body || '';

  // Ignore duplicates
  if (!message.id) return NextResponse.json({ status: 'ignored' });

  // Append user message to chat history
  appendMessage(userId, 'user', userText);

  // Prepare last 3 messages for context
  const messagesForML = userChats[userId];

  // Call ML backend
  let botReply = await getBotReply(messagesForML);

  // Clean & format for WhatsApp
  botReply = formatForWhatsApp(botReply);

  // Append bot reply to chat history
  appendMessage(userId, 'assistant', botReply);

  // Split long messages if necessary
  const chunks = splitLongMessage(botReply);

  for (const chunk of chunks) {
    const outgoingPayload = {
      messaging_product: 'whatsapp',
      to: userId,
      text: { body: chunk || 'Sorry, something went wrong.' },
    };
    console.log(
      '📤 Sending to WhatsApp:',
      JSON.stringify(outgoingPayload, null, 2)
    );

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${metadata.phone_number_id}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(outgoingPayload),
        }
      );

      const text = await response.text();
      console.log(
        `✅ Meta API response: status=${response.status}, body=${text}`
      );

      if (
        response.status >= 400 &&
        text.includes('Recipient phone number not in allowed list')
      ) {
        console.warn(
          '⚠️ Sandbox restriction: add recipient number to allowed list'
        );
      }
    } catch (err) {
      console.error('❌ Failed to send reply:', err);
    }
  }

  return NextResponse.json({ status: 'ok' });
}