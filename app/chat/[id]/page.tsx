'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useChatStore } from '@/lib/store/chatStore';
import ChatWindow from '@/components/ChatPage/ChatWindow';

export default function ChatPage() {
  const { id } = useParams();
  const setActiveChatId = useChatStore((s) => s.setActiveChatId);

  useEffect(() => {
    if (id) {
      setActiveChatId(id as string); // keep store in sync
    }
  }, [id, setActiveChatId]);

  return <ChatWindow />;
}
