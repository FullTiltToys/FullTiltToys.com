import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

import { site } from "@/lib/site";
import {
  WHOLESALE_BUSINESS_TYPES,
  WHOLESALE_HEAR_ABOUT,
  WHOLESALE_PRODUCT_LABELS,
} from "@/lib/wholesale";

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WholesaleProduct = {
  name: string;
  quantity: string;
};

type WholesaleBody = {
  name?: unknown;
  business?: unknown;
  website?: unknown;
  email?: unknown;
  phone?: unknown;
  businessTypes?: unknown;
  hearAbout?: unknown;
  hearAboutOther?: unknown;
  products?: unknown;
  notes?: unknown;
  message?: unknown;
  hp_website?: unknown;
};

function asText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function json(status: number, body: { ok: boolean; error?: string }) {
  return Response.json(body, { status });
}

function asUrl(value: unknown) {
  let raw = asText(value, 300);
  if (!raw) return "";
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (!url.hostname.includes(".")) return "";
    return url.toString();
  } catch {
    return "";
  }
}

function asAllowedList(
  value: unknown,
  allowed: readonly string[],
  maxItems: number,
) {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const item of value) {
    const text = asText(item, 40);
    if (!allowed.includes(text) || out.includes(text)) continue;
    out.push(text);
    if (out.length >= maxItems) break;
  }
  return out;
}

function asProducts(value: unknown): WholesaleProduct[] {
  if (!Array.isArray(value)) return [];
  const out: WholesaleProduct[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as { name?: unknown; quantity?: unknown };
    const name = asText(record.name, 40);
    if (!(WHOLESALE_PRODUCT_LABELS as readonly string[]).includes(name)) continue;
    if (out.some((entry) => entry.name === name)) continue;
    const quantity = asText(record.quantity, 10).replace(/[^\d]/g, "");
    out.push({ name, quantity });
  }
  return out;
}

function formatInquiry(payload: {
  name: string;
  business: string;
  website: string;
  email: string;
  phone: string;
  businessTypes: string[];
  hearAbout: string;
  products: WholesaleProduct[];
  notes: string;
}) {
  const interest = payload.products.length
    ? payload.products
        .map((item) =>
          item.quantity
            ? `${item.name} (est. qty ${item.quantity})`
            : item.name,
        )
        .join(", ")
    : "(none)";

  return [
    `Name: ${payload.name}`,
    `Company / Store: ${payload.business}`,
    `Website: ${payload.website || "(none)"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "(none)"}`,
    `Business type: ${payload.businessTypes.join(", ")}`,
    `How they heard about us: ${payload.hearAbout}`,
    `Product interest: ${interest}`,
    `Notes: ${payload.notes || "(none)"}`,
  ].join("\n");
}

async function appendLocal(row: Record<string, unknown>) {
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
  website: string;
  email: string;
  phone: string;
  businessTypes: string[];
  hearAbout: string;
  products: WholesaleProduct[];
  notes: string;
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
      Website: payload.website || "(none)",
      Phone: payload.phone || "(none)",
      "Business type": payload.businessTypes.join(", "),
      "Heard about us": payload.hearAbout,
      "Product interest": payload.products.length
        ? payload.products
            .map((item) =>
              item.quantity
                ? `${item.name} (est. qty ${item.quantity})`
                : item.name,
            )
            .join(", ")
        : "(none)",
      Notes: payload.notes || "(none)",
      Message: payload.message,
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

  if (asText(body.hp_website, 200)) {
    return json(200, { ok: true });
  }

  const name = asText(body.name, 80);
  const business = asText(body.business, 120);
  const websiteRaw = asText(body.website, 300);
  const website = websiteRaw ? asUrl(body.website) : "";
  const email = asText(body.email, 200).toLowerCase();
  const phone = asText(body.phone, 40);
  const businessTypes = asAllowedList(
    body.businessTypes,
    WHOLESALE_BUSINESS_TYPES,
    4,
  );
  const hearAboutRaw = asText(body.hearAbout, 40);
  const hearAboutOther = asText(body.hearAboutOther, 120);
  const hearAbout =
    hearAboutRaw === "Other" && hearAboutOther
      ? `Other: ${hearAboutOther}`
      : hearAboutRaw;
  const products = asProducts(body.products);
  const notes = asText(body.notes ?? body.message, 2000);

  const hearAllowed =
    (WHOLESALE_HEAR_ABOUT as readonly string[]).includes(hearAboutRaw) &&
    (hearAboutRaw !== "Other" || !!hearAboutOther);

  if (
    !name ||
    !business ||
    (websiteRaw && !website) ||
    !EMAIL_OK.test(email) ||
    !businessTypes.length ||
    !hearAllowed
  ) {
    return json(400, { ok: false, error: "invalid" });
  }

  const payload = {
    name,
    business,
    website,
    email,
    phone,
    businessTypes,
    hearAbout,
    products,
    notes,
    message: "",
  };
  payload.message = formatInquiry(payload);

  const row = {
    at: new Date().toISOString(),
    ...payload,
  };

  try {
    await emailInquiry(payload);
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
