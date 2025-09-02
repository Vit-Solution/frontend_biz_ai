'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const ChatBot = () => {
  // const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendToBot = async (message: string, chatId?: string) => {
    const payload = {
      topic: chatId ? undefined : 'general', // only include topic for new chats
      chat_id: chatId || undefined,
      role: 'user',
      content: message,
      temporary: false,
    };

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin', // send cookie with request
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorDetail;
      try {
        errorDetail = await res.json();
      } catch {
        errorDetail = await res.text();
      }
      throw new Error(
        errorDetail?.error || errorDetail?.message || 'Chat request failed'
      );
    }

    return res.json(); // upstream returns list of messages
  };

  // Demo messages on load and handle URL parameters
  useEffect(() => {
    // const questionParam = searchParams.get('question');
    const questionParam = ''; // Placeholder since useSearchParams is commented out

    const demoMessages: Message[] = [
      {
        id: '1',
        content:
          "Hello! I'm BizAI, your Nigerian business assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ];

    // If there's a question parameter, add it as a user message
    if (questionParam) {
      const userQuestion: Message = {
        id: '2',
        content: decodeURIComponent(questionParam),
        sender: 'user',
        timestamp: new Date(),
      };

      const botResponse: Message = {
        id: '3',
        content: `Great question! Let me help you with "${decodeURIComponent(
          questionParam
        )}". Based on Nigerian business regulations, here's what you need to know: [This would be the actual response from your API]`,
        sender: 'bot',
        timestamp: new Date(),
      };

      demoMessages.push(userQuestion, botResponse);
    } else {
      // Default demo conversation
      demoMessages.push(
        {
          id: '2',
          content: 'Hi! I need help with business registration in Nigeria.',
          sender: 'user',
          timestamp: new Date(),
        },
        {
          id: '3',
          content:
            "I'd be happy to help you with business registration! In Nigeria, you can register your business with the Corporate Affairs Commission (CAC). The main types are:\n\n1. **Business Name Registration** - For sole proprietorship\n2. **Company Registration** - For limited liability companies\n\nWhat type of business are you looking to register?",
          sender: 'bot',
          timestamp: new Date(),
        }
      );
    }

    const demoChatSessions: ChatSession[] = [
      {
        id: '1',
        title: 'Business Registration Help',
        lastMessage: 'What type of business are you looking to register?',
        timestamp: new Date(),
      },
      {
        id: '2',
        title: 'Tax Compliance Questions',
        lastMessage:
          "You'll need to register for VAT if your annual turnover...",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: '3',
        title: 'Import License Requirements',
        lastMessage: "For importing goods into Nigeria, you'll need...",
        timestamp: new Date(Date.now() - 172800000),
      },
    ];

    setMessages(demoMessages);
    setChatSessions(demoChatSessions);
    // }, [searchParams]); // Re-run when searchParams change
  }, []); // Empty dependency array since useSearchParams is commented out

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = 3 * 24; // 3 lines * line-height
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }
  }, [inputValue]);

 const handleSendMessage = async () => {
  if (!inputValue.trim() || isLoading) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    content: inputValue.trim(),
    sender: "user",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsLoading(true);

  try {
    const response = await sendToBot(userMessage.content, currentChatId);

    // response could be an array or object with messages
    const rawMessages = Array.isArray(response)
      ? response
      : response.messages || [];

    const mapped: Message[] = rawMessages.map((m: any, idx: number) => ({
      id: m.id || `${Date.now()}-${idx}`,
      content: m.content || "[No content]",
      sender: m.role === "user" ? "user" : "bot",
      timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
    }));

    setMessages((prev) => [...prev, ...mapped]);

    // Save chat_id for future requests
    const returnedChatId = response.chat_id || rawMessages[0]?.chat_id;
    if (returnedChatId && !currentChatId) {
      setCurrentChatId(returnedChatId);
    }
  } catch (err: any) {
    setMessages((prev) => [
      ...prev,
      {
        id: `err-${Date.now()}`,
        content: `⚠️ ${err.message || "Failed to connect to BizBot."}`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChatSessions = chatSessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const LoadingIndicator = () => (
    <div className="flex space-x-1 p-4">
      <div className="w-2 h-2 bg-muted-foreground rounded-full smooth-bounce"></div>
      <div className="w-2 h-2 bg-muted-foreground rounded-full smooth-bounce"></div>
      <div className="w-2 h-2 bg-muted-foreground rounded-full smooth-bounce"></div>
    </div>
  );

  return (
    <div className="h-screen flex bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'w-80 bg-card border-r flex flex-col fixed lg:relative inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Chat History</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Chat Sessions */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChatSessions.map((session) => (
              <Button
                key={session.id}
                variant="ghost"
                className="w-full justify-start p-3 h-auto mb-2 hover:bg-accent"
              >
                <div className="text-left">
                  <div className="font-medium text-sm truncate">
                    {session.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {session.lastMessage}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {session.timestamp.toLocaleDateString()}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
              <div className="w-8 h-8 primary-gradient rounded-full flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">
                BizAI - Nigerian Business FAQ
              </h1>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-3',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'bot' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    'rounded-2xl px-4 py-3 max-w-xs sm:max-w-md lg:max-w-lg',
                    message.sender === 'user'
                      ? 'chat-bubble-user'
                      : 'chat-bubble-bot'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="chat-bubble-bot">
                  <LoadingIndicator />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Nigerian business..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[48px] max-h-[120px]"
                  disabled={isLoading}
                  rows={1}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="primary-gradient hover-lift"
                size="lg"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
