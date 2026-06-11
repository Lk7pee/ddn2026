import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const contentTypes: Record<string, string> = {
  ".aac": "audio/aac",
  ".m4a": "audio/mp4",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav"
};

type RouteContext = {
  params: Promise<{
    name: string;
  }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { name } = await params;
  const safeName = path.basename(decodeURIComponent(name));
  const ext = path.extname(safeName).toLowerCase();

  if (!contentTypes[ext]) {
    return NextResponse.json({ error: "Unsupported audio type" }, { status: 400 });
  }

  const audioDir = path.join(process.cwd(), "audio");
  const filePath = path.join(audioDir, safeName);

  if (!filePath.startsWith(audioDir)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const file = await fs.readFile(filePath);
    const range = request.headers.get("range");

    if (range) {
      const match = range.match(/bytes=(\d*)-(\d*)/);
      const start = match?.[1] ? Number(match[1]) : 0;
      const end = match?.[2] ? Number(match[2]) : file.length - 1;
      const safeEnd = Math.min(end, file.length - 1);
      const chunk = file.subarray(start, safeEnd + 1);

      return new NextResponse(new Uint8Array(chunk), {
        status: 206,
        headers: {
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Length": String(chunk.length),
          "Content-Range": `bytes ${start}-${safeEnd}/${file.length}`,
          "Content-Type": contentTypes[ext]
        }
      });
    }

    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentTypes[ext]
      }
    });
  } catch {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }
}
