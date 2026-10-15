import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

import { site } from "@/lib/site";

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WholesaleBody = {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
};

function asText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function json(status: number, body: { ok: boolean; error?: string }) {
  return Response.json(body, { status });
}

async function appendLocal(row: Record<string, string>) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "wholesale.local.json"),
    `${JSON.stringify(row)}\n`,
    "utf8",
  );
}

async function emailInquiry(payload: {
  name: string;
  business: string;
  email: string;
  phone: string;
  message: string;
}) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY ?? "";
  if (!accessKey) {
    throw new Error("missing WEB3FORMS_ACCESS_KEY");
  }

  const to = process.env.WHOLESALE_TO_EMAIL || site.email;
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Wholesale inquiry from ${payload.business || payload.name}`,
      from_name: "Full Tilt Toys website",
      replyto: payload.email,
      email: payload.email,
      name: payload.name,
      "Store or company": payload.business,
      Phone: payload.phone || "(none)",
      Message: payload.message || "(none)",
      Inbox: to,
    }),
    signal: AbortSignal.timeout(10000),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`email ${response.status}`);
  }

  try {
    const parsed = JSON.parse(text) as { success?: boolean };
    if (parsed.success === false) throw new Error("email rejected");
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("email invalid response");
    }
    throw error;
  }
}

export async function POST(request: Request) {
  let body: WholesaleBody;
  try {
    body = (await request.json()) as WholesaleBody;
  } catch {
    return json(400, { ok: false, error: "invalid" });
  }

  if (asText(body.website, 200)) {
    return json(200, { ok: true });
  }

  const name = asText(body.name, 80);
  const business = asText(body.business, 120);
  const email = asText(body.email, 200).toLowerCase();
  const phone = asText(body.phone, 40);
  const message = asText(body.message, 1000);

  if (!name || !business || !EMAIL_OK.test(email)) {
    return json(400, { ok: false, error: "invalid" });
  }

  const row = {
    at: new Date().toISOString(),
    name,
    business,
    email,
    phone,
    message,
  };

  try {
    await emailInquiry({ name, business, email, phone, message });
  } catch {
    if (process.env.NODE_ENV === "production") {
      return json(502, { ok: false, error: "send failed" });
    }
    try {
      await appendLocal(row);
    } catch {
      return json(502, { ok: false, error: "send failed" });
    }
  }

  return json(200, { ok: true });
}
