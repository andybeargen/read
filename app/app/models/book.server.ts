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
  return prisma.book.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      title: true,
      author: true,
      image: true
    }
  });
}

export async function createBook(values: BookCreationData) {
  return prisma.book.create({
    data: values,
  });
}
