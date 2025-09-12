'use client';

import { Menu, MessageCircle } from 'lucide-react';
import ChatSidebar from '@/components/ChatPage/ChatSidebar';
import { useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col w-full">
      {/* Top Navigation Bar */}
      <nav className="bg-card border-b px-4 py-2 flex items-center justify-between">
        {/* Mobile navbar */}
        <div className="flex w-full items-center justify-between sm:hidden">
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="font-bold text-lg">
            BizAI
          </Link>
        </div>

        {/* Desktop navbar */}
         <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              BizAI
            </span>
          </Link>
      </nav>

      {/* Chat Interface */}
      <div className="flex flex-1 overflow-hidden w-full relative">
        {/* Desktop Sidebar (only sm and above) */}
        <div className="hidden sm:block h-full">
          <ChatSidebar />
        </div>

        {/* Mobile Sidebar (only <sm when sidebarOpen=true) */}
        {sidebarOpen && (
          <div className="sm:hidden absolute inset-y-0 left-0 z-40 w-64 h-full bg-white border-r shadow-lg animate-slideIn">
            <ChatSidebar
              closeSidebar={() => setSidebarOpen(false)}
              showClose
            />
          </div>
        )}

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
      </div>
    </div>
  );
}
