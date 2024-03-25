import type { Critter, UserCritter, User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Critter } from "@prisma/client";
export type { UserCritter } from "@prisma/client";

export async function getCritterById(id: Critter["id"]) {
  return prisma.critter.findUnique({ where: { id } });
}

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// model Book {
//   id          String         @id @default(uuid()) @map("_id")
//   title       String
//   author      String
//   genre       String?
//   description String
//   file        Bytes
//   image       Bytes?
//   user       User            @relation(fields: [userId], references: [id])
//   userId     String
// }

// model User {
//   id                         String              @id @default(uuid()) @map("_id")
//   email                      String              @unique
//   username                   String
//   password                   String
//   coins                      Int                 @default(0)
//   books                      Book[]
//   dateCreated                DateTime            @default(now())
//   UserCritter                UserCritter[]
// }

// model Critter {
//   id          String @id @default(uuid()) @map("_id")
//   name        String @unique
//   description String
//   type        String
//   UserCritter UserCritter[]
// }

// model UserCritter {
//   id        String @id @default(uuid()) @map("_id")
//   level     Int @default(1)
//   xp        Int @default(0)
//   userId    String
//   critterId String
//   user      User @relation(fields: [userId], references: [id])
//   critter   Critter @relation(fields: [critterId], references: [id])
// }

export async function createCritter(
  name: Critter["name"],
  description: Critter["description"],
  type: Critter["type"]
) {
  const critterExists = await prisma.critter.findUnique({
    where: {
      name: name,
    },
  });

  if (critterExists) {
    return critterExists;
  }

  return prisma.critter.create({
    data: {
      name: name,
      description: description,
      type: type,
    },
  });
}
export async function updateCritter(
  id: Critter["id"],
  name: Critter["name"],
  description: Critter["description"],
  type: Critter["type"]
) {
  return prisma.critter.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
      type: type,
    },
  });
}

export async function assignCritterToUser(
  userId: User["id"],
  critterId: Critter["id"]
) {
  return prisma.userCritter.create({
    data: {
      userId,
      critterId,
    },
  });
}

export async function getUserCritters(userId: User["id"]) {
  return prisma.userCritter.findMany({
    where: {
      userId,
    },
    include: {
      critter: true,
    },
  });
}
