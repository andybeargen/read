import type { User, Book } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Book } from "@prisma/client";

export type BookCreationData = {
    title: string,
    author: string,
    genre: string,
    description: string,
    file: Buffer,
    image: Buffer | null,
    user: {connect: {id: string}}
};

export async function getBookById(id: Book["id"]) {
  return prisma.book.findUnique({ where: { id } });
}

export async function getUserLibrary(userId: User["id"]) {
  return prisma.book.findMany({ where: { userId } });
}

export async function createBook(values: BookCreationData) {
  return prisma.book.create({
    data: values,
  });
}
