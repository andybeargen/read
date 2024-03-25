import type { Critter, UserCritter, User } from "@prisma/client";

import { prisma } from "~/db.server";

import critters from "../../critters.json";

export type { Critter } from "@prisma/client";
export type { UserCritter } from "@prisma/client";

export async function getCritterById(id: Critter["id"]) {
  return prisma.critter.findUnique({ where: { id } });
}

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
  });
}

export async function hatchCritter(userId: User["id"]): Promise<Critter | null> {
  let critterName: Critter["name"] = getRandomCritter();
  let critter: Critter | null = await prisma.critter.findUnique({
    where: {
      name: critterName,
    }
  });

  if (critter) {
    await assignCritterToUser(userId, critter.id);
  }
  return critter;
}

export function getRandomCritter(): Critter["name"] {
  let randIdx: number = Math.floor(Math.random() * critters.length);
  return critters[randIdx].data.name;
}
