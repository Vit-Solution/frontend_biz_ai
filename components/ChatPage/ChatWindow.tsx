'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/lib/store/chatStore';
import { useMessages, useSendMessage, useNewChat } from '@/lib/hooks/useChats';
import { Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function ChatWindow() {
  const router = useRouter();
  const activeChatId = useChatStore((s) => s.activeChatId);
  const setActiveChatId = useChatStore((s) => s.setActiveChatId);
  const input = useChatStore((s) => s.input);
  const setInput = useChatStore((s) => s.setInput);

  const { data: messages = [], isLoading } = useMessages(activeChatId);
  const sendMessage = useSendMessage(activeChatId || '');
  const newChat = useNewChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    if (!activeChatId) {
      newChat.mutate(input, {
        onSuccess: (data) => {
          const chatId = data[0].id;
          setActiveChatId(chatId);
          router.push(`/chat/${chatId}`);
        },
      });
    } else {
      sendMessage.mutate(input);
    }

    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-3 sm:p-4 space-y-3">
        {!activeChatId && !newChat.isPending ? (
          <div className="flex flex-col items-center justify-center text-gray-500 h-full text-center px-4">
            <p className="mb-2 text-lg font-medium">
              Hi 👋, this is Bizzbot
            </p>
            <p className="text-sm">Start typing below to begin a new chat.</p>
          </div>
        ) : isLoading ? (
          <div className="text-center text-gray-500">
            Loading messages…
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id || Math.random()}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] sm:max-w-md rounded-2xl px-3 py-2 shadow break-words ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                {/* {msg.content} */}
                {msg.role === "assistant" ? (
                <div
                  className="prose prose-sm max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\n/g, "<br/>")
                      .replace(/(\d+\.)/g, "<br/><strong class='text-primary font-semibold'>$1</strong>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-primary font-semibold'>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em class='text-primary/80'>$1</em>"),
                  }}
                />
              ) : (
                <p className="text-sm leading-relaxed">{msg.content}</p>
              )}
              </div>
            </div>
          ))
        )}

        {(sendMessage.isPending || newChat.isPending) && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-600 rounded-2xl px-3 py-2 flex items-center space-x-1">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-150">●</span>
              <span className="animate-bounce delay-300">●</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-2 sm:p-3 bg-white flex items-center space-x-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || sendMessage.isPending || newChat.isPending}
          className="shrink-0"
        >
          {sendMessage.isPending || newChat.isPending ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
