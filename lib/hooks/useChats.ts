// lib/hooks/useChats.ts
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchChats, createNewChat, fetchMessages, sendMessageApi, MessageModel, ChatSummary, deleteChat, renameChat } from "@/lib/api";
import { useRouter } from 'next/navigation';


//
// useChats - fetch chat list
//
export function useChats() {
  return useQuery<ChatSummary[]>({
    queryKey: ["chats"],
    queryFn: fetchChats,
    staleTime: 1000 * 30, // 30s
  });
}


export function useNewChat() {
  const queryClient = useQueryClient();
  const router = useRouter()

  return useMutation({
    mutationFn: createNewChat,
    onSuccess: (data) => {
      if (!data || !data.length) return;

      // 1️⃣ Extract new chat metadata
      const chatMeta = data[0]; // first element = chat info
      const chatId = chatMeta.id;

      // 2️⃣ Add new chat to the chats list
      queryClient.invalidateQueries({ queryKey: ["chats"] });

      // 3️⃣ Seed messages cache for this new chat
      // Remaining elements in array are messages
      const initialMessages = data.slice(1);
      queryClient.setQueryData(["messages", chatId], initialMessages);
      router.push(`/chat/${chatId}`);
    },
  });
}

//
// useMessages - query messages for a given chatId (paginated default page 1)
//
export function useMessages(chatId: string | null, pageSize = 40, pageNumber = 1) {
  return useQuery<MessageModel[]>({
    queryKey: ["messages", chatId, pageNumber, pageSize],
    queryFn: () => {
      if (!chatId) return Promise.resolve([] as MessageModel[]);
      return fetchMessages(chatId, pageSize, pageNumber);
    },
    enabled: !!chatId,
    placeholderData: keepPreviousData
  });
}


export function useSendMessage(chatId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) =>
      sendMessageApi(chatId, message), // this returns the updated messages list
    onSuccess: (data) => {
      // directly replace messages cache with server response
      queryClient.setQueryData(["messages", chatId, 1, 40], data);
    },
  });
}


// 🔹 Delete chat mutation
export function useDeleteChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteChat(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] }); // refresh sidebar
    },
  });
}

// 🔹 Rename chat mutation
export function useRenameChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, topic }: { id: string; topic: string }) =>
      renameChat(id, topic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] }); // refresh sidebar
    },
  });
}