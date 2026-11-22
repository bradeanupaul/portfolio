import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(145deg, #0b0b0a 0%, #1c1a17 45%, #141311 100%)",
          color: "#f5efe3",
          fontFamily: "Georgia, serif",
        }}
      >
        <p
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#e8c987",
            marginBottom: 16,
          }}
        >
          Ristorante Italiano · Cluj
        </p>
        <h1 style={{ fontSize: 96, lineHeight: 1, margin: 0 }}>Bella Notte</h1>
        <p style={{ fontSize: 32, color: "#b8aea0", marginTop: 28, maxWidth: 760 }}>
          {siteConfig.description}
        </p>
        <p style={{ fontSize: 18, color: "#857d72", marginTop: 48 }}>
          Site demonstrativ pentru portofoliu
        </p>
      </div>
    ),
    { ...size },
  );
}