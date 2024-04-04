import * as fs from "fs";
import * as path from "path";
import { tmpdir } from "os";
import { EPub } from "epub2";
import { Book } from "@prisma/client";

export async function parseEpub(epubFile: File) {
  const tmpFileName = `tempfile_${Date.now()}`;
  const tmpFilePath = path.join(tmpdir(), tmpFileName);

  const arrayBuffer = await epubFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(tmpFilePath, buffer);

  let epub = await EPub.createAsync(tmpFilePath);
  let metadata = epub.metadata;
  let img = await epub.getImageAsync(epub.metadata.cover);

  fs.rmSync(tmpFilePath);

  return {
    title: metadata.title as string,
    author: metadata.creator as string,
    description: metadata.description as string,
    genre: "",
    file: buffer as Buffer,
    image: img[0],
    chapterCount: epub.flow.length,
  };
}
