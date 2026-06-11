import { promises as fs } from "fs";
import path from "path";
import { ExperienceClient } from "../components/ExperienceClient";

async function getPhotos() {
  const imgDir = path.join(process.cwd(), "img");
  const chapterAssets = new Set(["hellokitty.png", "spiderman.png"]);

  try {
    const files = await fs.readdir(imgDir);

    return files
      .filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file))
      .filter((file) => !chapterAssets.has(file.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

async function getAudioFile() {
  const audioDir = path.join(process.cwd(), "audio");

  try {
    const files = await fs.readdir(audioDir);

    return (
      files
        .filter((file) => /\.(m4a|mp3|ogg|wav|aac)$/i.test(file))
        .sort((a, b) => a.localeCompare(b))[0] ?? null
    );
  } catch {
    return null;
  }
}

export default async function Home() {
  const photos = await getPhotos();
  const audioFile = await getAudioFile();

  return <ExperienceClient audioFile={audioFile} photos={photos} />;
}
