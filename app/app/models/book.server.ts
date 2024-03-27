import type { User, Book } from "@prisma/client";
import * as fs from 'fs';

import { prisma } from "~/db.server";
import { Buffer} from "buffer";
export type { Book } from "@prisma/client";


export type BookCreationData = Omit<Book, "userId" | "id"> & {user: {connect: {id: string}}};

export async function getBookById(id: Book["id"]) {
  const book = await prisma.book.findUnique({ where: { id } });
  const filePath = "public/files/current.epub";

  fs.writeFileSync(filePath, Buffer.from(book.file));
  
  return book;
}

export async function getUserLibrary(userId: User["id"]) {
  return prisma.book.findMany({ where: { userId } });
}

export async function setReadingProgress(id: Book["id"], userId: User["id"], progress: number) {
  await prisma.book.update({ where: { id: id, userId: userId }, data: {progress: progress} });
}

export async function createBook(values: BookCreationData) {
  return prisma.book.create({
    data: values,
  });
}
