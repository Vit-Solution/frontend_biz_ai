import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/lib/store/chatStore';
import { useDeleteChat, useRenameChat } from '@/lib/hooks/useChats';
import { ChatSummary } from '@/lib/api';

type ChatItemProps = {
  chat: ChatSummary;
};

export default function ChatItem({ chat }: ChatItemProps) {
  const router = useRouter();
  const { activeChatId, setActiveChatId } = useChatStore();
  const [isEditing, setIsEditing] = useState(false);
  const [topic, setTopic] = useState(chat.topic || 'Untitled');

  const deleteChatMutation = useDeleteChat();
  const renameChatMutation = useRenameChat();

  const handleRename = () => {
    renameChatMutation.mutate(
      { id: chat.id, topic },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleDelete = () => {
    deleteChatMutation.mutate(chat.id, {
      onSuccess: () => {
        if (activeChatId === chat.id) {
          setActiveChatId(null);
          router.push('/chat');
        }
      },
    });
  };

  return (
    <li
      key={chat.id}
      className={`group flex items-center justify-between p-2 rounded cursor-pointer max-w-64 ${
        activeChatId === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'
      }`}
      onClick={() => {
        setActiveChatId(chat.id);
        router.push(`/chat/${chat.id}`);
      }}
    >
      {/* Chat title or edit input */}
      <div className="flex-1">
        {isEditing ? (
          <input
            className="w-full bg-transparent border-b border-green-500 text-sm outline-none"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
            }}
            autoFocus
          />
        ) : (
          <div className="font-medium text-sm truncate">{topic}</div>
        )}
        <div className="text-xs text-gray-500 truncate">
          {new Date(chat.last_updated).toLocaleString()}
        </div>
      </div>

      {/* Hover menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 cursor-pointer"
            onClick={(e) => e.stopPropagation()} // prevent opening chat
          >
            <MoreVertical className="h-4 w-4 text-gray-600" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            <Pencil className="h-4 w-4 mr-2 cursor-pointer" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2 cursor-pointer" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
