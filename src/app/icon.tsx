import { ImageResponse } from "next/og";

import { fttIconPng64 } from "@/lib/ftt-icon";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: "flex",
          background: "#fff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${fttIconPng64}`}
          width={64}
          height={64}
          alt=""
        />
      </div>
    ),
    size,
  );
}
