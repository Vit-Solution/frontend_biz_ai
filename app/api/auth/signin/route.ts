import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const form = new URLSearchParams({
    grant_type: "password",
    username,
    password,
    scope: "",
    client_id: "string",        // 🔒 put in env vars later
    client_secret: "********",  // 🔒 put in env vars later
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
  const accessToken = data.access_token as string;

  // Set token in secure, httpOnly cookie
  cookies().set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",     
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
