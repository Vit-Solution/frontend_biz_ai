"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { Bot, Send, User } from "lucide-react";

export default function ChatsBot() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are BizAI, a business assistant." }
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mutation = useChat((assistantMessage) => {
    setMessages((prev) => [...prev, assistantMessage]);
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    // update UI immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // send history to backend
    mutation.mutate([...messages, userMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto bg-gradient-to-br from-background via-background to-primary-light/5">
      {/* Enhanced Header */}
      {/* <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 primary-gradient rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BizAI Assistant
              </h1>
              <p className="text-sm text-muted-foreground">Nigerian Business FAQ Expert</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-primary-light/20 px-4 py-2 rounded-full border border-primary/10">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Online</span>
          </div>
        </div>
      </header> */}

      {/* Enhanced Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 space-y-6">
        {messages.slice(1).map((m, i) => (
          <div
            key={i}
            className={`flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300 ${
              m.role === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              {m.role === "user" ? (
                <div className="w-9 h-9 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm shadow-md border-2 border-white">
                  <User />
                </div>
              ) : (
                <div className="w-9 h-9 primary-gradient rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`relative max-w-[75%] px-5 py-4 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md border ${
                m.role === "user"
                  ? "bg-gray-300 text-black border-border/20 rounded-br-md"
                  : "bg-gray-100 text-foreground rounded-bl-md border-border/10"
              }`}
            >
              {m.role === "assistant" ? (
                <div
                  className="prose prose-sm max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: m.content
                      .replace(/\n/g, "<br/>")
                      .replace(/(\d+\.)/g, "<br/><strong class='text-primary font-semibold'>$1</strong>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-primary font-semibold'>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em class='text-primary/80'>$1</em>"),
                  }}
                />
              ) : (
                <p className="text-sm leading-relaxed">{m.content}</p>
              )}
              
              {/* Message timestamp */}
              <div className={`text-xs mt-2 opacity-60 ${
                m.role === "user" ? "text-right text-muted-foreground" : "text-muted-foreground"
              }`}>
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {mutation.isPending && (
          <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300">
            <div className="w-9 h-9 primary-gradient rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-muted/60 rounded-2xl rounded-bl-md px-5 py-4 border border-border/10">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">BizAI is thinking</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="px-6 py-4 bg-card/80 backdrop-blur-sm border-t border-border/50">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <textarea
              className="w-full resize-none border border-border/30 rounded-2xl px-4 py-3 pr-12 bg-background/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200 placeholder:text-muted-foreground/60 min-h-[52px] max-h-32 shadow-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about business registration, regulations, funding opportunities..."
              rows={1}
              style={{
                height: 'auto',
                minHeight: '52px'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          {/* Enhanced Send Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || mutation.isPending}
            className={`relative h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 ${
              input.trim() && !mutation.isPending
                ? "primary-gradient text-white hover:shadow-primary/25"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {mutation.isPending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Quick Action Suggestions */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            "How to register a business?",
            "CAC registration process",
            "Business funding options",
            "Tax requirements"
          ].map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setInput(suggestion)}
              disabled={mutation.isPending}
              className="text-xs px-3 py-2 bg-primary-light/20 hover:bg-primary-light/40 text-primary rounded-full transition-all duration-200 hover:scale-105 border border-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}