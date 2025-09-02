// hooks/useChat.ts
import { useMutation } from "@tanstack/react-query";

async function sendMessage(messages: { role: string; content: string }[]) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json(); // will always return { message: { role, content } }
}

export function useChat(onMessage: (msg: { role: string; content: string }) => void) {
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      onMessage(data.message);
    },
  });
}
