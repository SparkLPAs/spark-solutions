import { ImageResponse } from "next/og";

import { site } from "@/lib/env";

export const alt = `${site.name} — White-Label Estate Planning Platform`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#1E3A5F",
          backgroundImage:
            "linear-gradient(135deg, #1D4ED8 0%, #1E3A5F 45%, #1E3A5F 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #1D4ED8, #1E3A5F)",
              boxShadow: "0 0 0 2px rgba(255,255,255,0.15)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path
                d="M17.5 6.5 10 18h5.2l-1 7.5L22 13h-5.2l0.7-6.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "white" }}>
            <span style={{ color: "#6EE7B7" }}>Spark</span>
            <span style={{ marginLeft: 12 }}>Solutions</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "white",
            maxWidth: 920,
          }}
        >
          Power Your Estate Planning Business, All in One Platform
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          White-labelled website · AI-assisted documents · Online Wills · Legal &amp; probate partner
        </div>
      </div>
    ),
    { ...size }
  );
}
