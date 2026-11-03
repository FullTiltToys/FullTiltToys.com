import { ImageResponse } from "next/og";

import { fttIconPng64 } from "@/lib/ftt-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          background: "#fff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${fttIconPng64}`}
          width={180}
          height={180}
          alt=""
        />
      </div>
    ),
    size,
  );
}
