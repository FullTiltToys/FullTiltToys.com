import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const media = join(root, "src/lib/media");
const manifest = JSON.parse(readFileSync(join(media, "manifest.json"), "utf8"));

for (const [name, spec] of Object.entries(manifest)) {
  const b64 = spec.chunks
    .map((chunk) => readFileSync(join(media, chunk.file), "utf8"))
    .join("");
  const buf = Buffer.from(b64, "base64");
  const sha = createHash("sha256").update(buf).digest("hex");
  if (sha !== spec.sha256) {
    throw new Error(`SHA mismatch for ${name}: got ${sha}`);
  }
  if (buf.length !== spec.bytes) {
    throw new Error(`Byte length mismatch for ${name}: got ${buf.length}`);
  }
  const dest = join(root, spec.dest);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  console.log(`assembled ${spec.dest} (${buf.length} bytes)`);
}
