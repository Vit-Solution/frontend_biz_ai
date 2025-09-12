// app/api/chat/send/route.ts
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();

  const upstream = await fetch(`${process.env.API_BASE}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await upstream.json();
  return Response.json(data);
}
