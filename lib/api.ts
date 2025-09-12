// lib/api.ts
import axios from "axios";

export type ChatSummary = {
  id: string;
  user_id: string;
  topic: string;
  total_conversations: number;
  summarised_messages: number;
  created_at: string;
  last_updated: string;
};

export type MessageModel = {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

// fetch all chats (proxy)
export const fetchChats = async (): Promise<ChatSummary[]> => {
  const { data } = await axios.get("/api/chats");
  return data;
};


export const createNewChat = async (message: string) => {
  const { data } = await axios.post("/api/chats/new", {
    role: "user",
    content: message,
  });
  return data; // contains { chat_id, topic, messages }
};


// fetch messages for a chat (proxy) - paginated
export const fetchMessages = async (
  chatId: string,
  pageSize = 40,
  pageNumber = 1
): Promise<MessageModel[]> => {
  const { data } = await axios.get(`/api/chats/${chatId}`, {
    params: { page_size: pageSize, page_number: pageNumber },
  });
  return data;
};

// send a message to an existing chat (proxy)
export const sendMessageApi = async (chatId: string, content: string) => {
  const { data } = await axios.post(`/api/chats/send`, {
    chat_id: chatId,
    role: 'user',
    content,
  });
  return data; // expected to return updated messages or last 20 messages
};


export async function deleteChat(id: string) {
  const res = await fetch(`/api/chats/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete chat");
  }
  return res.json();
}

// ✅ Rename a chat
export async function renameChat(id: string, topic: string) {
  const res = await fetch(`/api/chats/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  if (!res.ok) {
    throw new Error("Failed to rename chat");
  }
  return res.json();
}
