'use client';

import { ChatSummary } from '@/lib/api';
import { useChats } from '@/lib/hooks/useChats';
import { useChatStore } from '@/lib/store/chatStore';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import ChatItem from './ChatItem';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export type ChatSidebarProps = {
  closeSidebar?: () => void;
  showClose?: boolean;
};

export default function ChatSidebar({
  closeSidebar,
  showClose,
}: ChatSidebarProps) {
  const router = useRouter();
  const { data, isLoading, error } = useChats();
  const { setActiveChatId } = useChatStore();

  // ✅ always declared
  useEffect(() => {
    if (!error) return;

    if ((error as any).status === 401) {
      toast({
        title: 'Unauthorized',
        description: 'Please log in again.',
        variant: 'destructive',
      });
      router.push('/login');
    }
  }, [error, router]);

  const handleNewChat = () => {
    setActiveChatId(null);
    router.push(`/chat`);
    closeSidebar?.();
  };

  if (isLoading) return <div>Loading chats...</div>;
  // if (error) {
  //   // Trigger side effects first
  //   toast({
  //     title: 'Session Expired, Log in again',
  //     description: error.message,
  //     variant: 'destructive',
  //   });

  //   router.push('/login');
  // }

  const sortedChats = [...(data || [])].sort(
    (a, b) =>
      new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
  );

  return (
    <aside className="w-68 bg-gray-50 border-r p-4 flex flex-col h-full overflow-y-auto">
      {/* Mobile close button */}
      {showClose && (
        <button
          onClick={closeSidebar}
          className="mb-4 self-end p-2 rounded hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <button
        onClick={handleNewChat}
        className="mb-4 p-2 bg-green-600 cursor-pointer text-white rounded"
      >
        + New Chat
      </button>

      <ul className="space-y-2">
        {sortedChats.map((chat: ChatSummary) => (
          <ChatItem chat={chat} key={chat.id} />
        ))}
      </ul>
    </aside>
  );
}
