export async function POST(req: Request) {
  return new Response("Hello from chat!", { status: 200 });
}

// // app/api/bizzbot/route.ts
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function POST(req: Request) {
//   // Read token from HTTP-only cookie
//   const token = cookies().get("access_token")?.value;
//   if (!token) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   // Forward body to upstream BizzBot API
//   let body: any;
//   try {
//     body = await req.json();
//   } catch (err) {
//     return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//   }

//   try {
//     const upstream = await fetch("https://vit-api-ca7a.onrender.com/api/v1/bizzbot/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     const text = await upstream.text();
//     // try parse JSON, fallback to text
//     try {
//       const json = JSON.parse(text);
//       return NextResponse.json(json, { status: upstream.status });
//     } catch {
//       return new NextResponse(text, { status: upstream.status, headers: { "Content-Type": "text/plain" }});
//     }
//   } catch (err) {
//     console.error("Proxy error:", err);
//     return NextResponse.json({ error: "Upstream request failed" }, { status: 502 });
//   }
// }
