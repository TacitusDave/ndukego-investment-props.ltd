import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const apiPath = "/" + path.join("/");
  const url = `${API_BASE}${apiPath}`;

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers = new Headers();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const contentType = req.headers.get("content-type");

  let body: BodyInit | null = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    if (contentType?.includes("multipart/form-data")) {
      body = await req.formData();
    } else {
      const text = await req.text();
      if (text) {
        body = text;
        headers.set("content-type", "application/json");
      }
    }
  }

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: req.method,
      headers,
      body: body ?? undefined,
      // @ts-expect-error -- Node 18+ supports this
      duplex: "half",
    });
  } catch {
    return NextResponse.json({ message: "Cannot reach API server" }, { status: 502 });
  }

  const responseBody = await upstream.arrayBuffer();
  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: { "content-type": upstream.headers.get("content-type") ?? "application/json" },
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
