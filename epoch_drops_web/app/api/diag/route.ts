// app/api/diag/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
  const payload: any = {
    ok: true,
    NEXT_PUBLIC_API_BASE_URL: base || null,
    time: new Date().toISOString(),
  };

  if (base) {
    try {
      const r = await fetch(`${base}/search?q=test`, { cache: "no-store" });
      payload.upstream = { status: r.status, ok: r.ok, contentType: r.headers.get("content-type") };
    } catch (e: any) {
      payload.upstream = { error: e?.message ?? String(e) };
    }
  }

  return NextResponse.json(payload);
}
