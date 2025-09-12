import { cookies } from "next/headers";

export async function GET() {
  const API_BASE = "https://vit-api-ca7a.onrender.com/api/v1/bizzbot"
  const token = (await cookies()).get("access_token")?.value;
  console.log(token)

  if (!token) {
    return Response.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const upstream = await fetch(`${API_BASE}/my-chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await upstream.json();
  return Response.json(data, { status: upstream.status });
}

