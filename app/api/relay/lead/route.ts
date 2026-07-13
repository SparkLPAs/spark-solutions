import { NextResponse } from "next/server";

// Lets the static Spark-family sites (Spark-Works, SparkMade, etc. -- plain
// HTML with no server of their own) send leads into the CRM without ever
// exposing LEADS_INBOUND_SECRET in public page source. This route holds the
// secret server-side and forwards on their behalf.
//
// Only a fixed set of known Spark pipelines/origins are allowed through, so
// this can't be used as an open relay by arbitrary third-party sites.
const ALLOWED_PIPELINES = new Set(["spark-works", "sparkmade", "sparktrusts", "sparkwills", "sparklpas"]);

const ALLOWED_ORIGINS = new Set([
  "https://www.spark-works.co.uk",
  "https://spark-works.co.uk",
  "https://www.sparkmade.co.uk",
  "https://sparkmade.co.uk",
  "https://www.sparktrusts.co.uk",
  "https://sparktrusts.co.uk",
  "https://www.sparkwills.co.uk",
  "https://sparkwills.co.uk",
  "https://www.sparklpas.co.uk",
  "https://sparklpas.co.uk",
]);

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403, headers });
  }

  const body = await request.json().catch(() => null);
  if (!body || !ALLOWED_PIPELINES.has(body.pipelineId) || !body.name) {
    return NextResponse.json({ error: "pipelineId and name are required" }, { status: 400, headers });
  }

  const url = process.env.CRM_LEADS_URL;
  const secret = process.env.LEADS_INBOUND_SECRET;
  if (!url || !secret) {
    return NextResponse.json({ error: "CRM not configured" }, { status: 500, headers });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify({
        pipelineId: body.pipelineId,
        name: body.name,
        company: body.company || null,
        email: body.email || null,
        phone: body.phone || null,
        source: body.source || `${body.pipelineId} website form`,
        message: body.message || null,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ error: `CRM responded ${res.status}: ${text}` }, { status: 502, headers });
    }
    return NextResponse.json({ ok: true }, { headers });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 502, headers });
  }
}
