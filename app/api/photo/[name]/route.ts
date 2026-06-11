import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

type RouteContext = {
  params: Promise<{
    name: string;
  }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const { name } = await params;
  const safeName = path.basename(decodeURIComponent(name));
  const ext = path.extname(safeName).toLowerCase();

  if (!contentTypes[ext]) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  }

  const imgDir = path.join(process.cwd(), "img");
  const filePath = path.join(imgDir, safeName);

  if (!filePath.startsWith(imgDir)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentTypes[ext]
      }
    });
  } catch {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
