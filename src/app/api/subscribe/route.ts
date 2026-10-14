import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

import { mailingLists } from "@/lib/site";

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIST_BY_ID = new Map<string, string>(
  mailingLists.map((list) => [list.id, list.label]),
);

type SubscribeBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  list?: unknown;
  website?: unknown;
};

function asText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function json(status: number, body: { ok: boolean; error?: string }) {
  return Response.json(body, { status });
}

async function appendLocal(row: {
  at: string;
  firstName: string;
  lastName: string;
  email: string;
  list: string;
}) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "subscribers.local.json"),
    `${JSON.stringify(row)}\n`,
    "utf8",
  );
}

async function appendSheet(payload: {
  firstName: string;
  lastName: string;
  email: string;
  list: string;
}) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "";
  if (!url.startsWith("https://script.google.com/")) {
    throw new Error("bad webhook");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
    signal: AbortSignal.timeout(10000),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`webhook ${response.status}`);
  }

  try {
    const parsed = JSON.parse(text) as { ok?: boolean };
    if (parsed.success === false) throw new Error("webhook rejected");
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Apps Script sometimes returns empty/HTML after a redirect; a 200 is enough.
      return;
    }
    throw error;
  }
}

export async function POST(request: Request) {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return json(400, { ok: false, error: "invalid" });
  }

  if (asText(body.website, 200)) {
    return json(200, { ok: true });
  }

  const firstName = asText(body.firstName, 80);
  const lastName = asText(body.lastName, 80);
  const email = asText(body.email, 200).toLowerCase();
  const listId = asText(body.list, 80);
  const list = LIST_BY_ID.get(listId);

  if (!EMAIL_OK.test(email)) {
    return json(400, { ok: false, error: "email" });
  }
  if (!list) {
    return json(400, { ok: false, error: "list" });
  }

  const row = {
    at: new Date().toISOString(),
    firstName,
    lastName,
    email,
    list,
  };

  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  try {
    if (webhook) {
      await appendSheet({
        firstName,
        lastName,
        email,
        list,
      });
    } else if (process.env.NODE_ENV === "production") {
      return json(503, { ok: false, error: "not configured" });
    } else {
      await appendLocal(row);
    }
  } catch {
    return json(502, { ok: false, error: "save failed" });
  }

  return json(200, { ok: true });
}
