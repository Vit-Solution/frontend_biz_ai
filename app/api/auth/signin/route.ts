import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const form = new URLSearchParams({
    grant_type: "password",
    username,
    password,
    scope: "",
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!
  });

  const upstream = await fetch("https://vit-api-ca7a.onrender.com/api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "accept": "application/json",
    },
    body: form.toString(),
  });

  if (!upstream.ok) {
    let msg = `Signin failed (${upstream.status})`;
    try {
      const e = await upstream.json();
      msg = e.detail || e.error || e.message || msg;
    } catch {}
    return NextResponse.json({ error: msg }, { status: upstream.status });
  }

  const data = await upstream.json();
  console.log(data)
  const accessToken = data.access_token as string;

  // Set token in secure, httpOnly cookie
  const cookieStore = await cookies()
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",     
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
