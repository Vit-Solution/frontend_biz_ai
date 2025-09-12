// // app/api/chats/[id]/route.ts
// import { cookies } from 'next/headers';


// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const token = (await cookies()).get("access_token")?.value;
//   if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const pageSize = searchParams.get("page_size") || "40";
//   const pageNumber = searchParams.get("page_number") || "1";

//   const upstream = await fetch(
//   `https://vit-api-ca7a.onrender.com/api/v1/bizzbot/my-chats/messagess/${params.id}?page_size=${pageSize}&page_number=${pageNumber}`,
//   {
//     headers: { Authorization: `Bearer ${token}` },
//   }
// );


//   if (!upstream.ok) {
//   const errText = await upstream.text();
//   console.error("❌ Upstream error:", upstream.status, errText);
//   return Response.json({ error: errText }, { status: upstream.status });
// }

//   const data = await upstream.json();
//   return Response.json(data);
// }




// app/api/chats/[id]/route.ts
import { cookies } from "next/headers";

// 🔹 GET messages for a chat
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = (await cookies()).get("access_token")?.value;
  if (!token)
    return Response.json({ error: "Not authenticated" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const pageSize = searchParams.get("page_size") || "40";
  const pageNumber = searchParams.get("page_number") || "1";

  const upstream = await fetch(
    `https://vit-api-ca7a.onrender.com/api/v1/bizzbot/my-chats/messagess/${id}?page_size=${pageSize}&page_number=${pageNumber}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!upstream.ok) {
    const errText = await upstream.text();
    console.error("❌ Upstream error:", upstream.status, errText);
    return Response.json({ error: errText }, { status: upstream.status });
  }

  const data = await upstream.json();
  return Response.json(data);
}

// 🔹 DELETE chat
export async function DELETE(
  req: Request,
{ params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = (await cookies()).get("access_token")?.value;
  if (!token)
    return Response.json({ error: "Not authenticated" }, { status: 401 });

  const upstream = await fetch(
    `https://vit-api-ca7a.onrender.com/api/v1/bizzbot/delete-chat/${id}?chat_id=${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!upstream.ok) {
    const errText = await upstream.text();
    console.error("❌ Delete error:", upstream.status, errText);
    return Response.json({ error: errText }, { status: upstream.status });
  }

  return Response.json({ success: true });
}

// 🔹 PUT (rename chat → edit-topic)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = (await cookies()).get("access_token")?.value;
  if (!token)
    return Response.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  if (!body.topic) {
    return Response.json({ error: "Topic is required" }, { status: 400 });
  }

  const upstream = await fetch(
    `https://vit-api-ca7a.onrender.com/api/v1/bizzbot/edit-topic?chat_id=${id}&topic=${encodeURIComponent(
      body.topic
    )}`,
    {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!upstream.ok) {
    const errText = await upstream.text();
    console.error("❌ Rename error:", upstream.status, errText);
    return Response.json({ error: errText }, { status: upstream.status });
  }

  const data = await upstream.json();
  return Response.json(data);
}
