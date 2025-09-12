// app/api/chats/new/route.ts
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json(); // ✅ must parse the JSON body

  const upstream = await fetch(`${process.env.API_BASE}/new-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ✅ required
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body), // ✅ stringify before sending
  });

  const data = await upstream.json();
  return Response.json(data, { status: upstream.status });
}
