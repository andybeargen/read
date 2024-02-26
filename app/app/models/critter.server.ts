import type { Critter, UserCritter, User } from "@prisma/client";

import { prisma } from "~/db.server";

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
  console.log("Update Critter");

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
