import type { Users } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { Users } from "@prisma/client";

export async function getUserById(id: Users["id"]) {
    return prisma.users.findUnique({ where: { id } });
}

export async function createUser(username: Users["username"], 
    email: Users["email"],
    password: Users["password"]) {

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    })

}

export async function loginUser(username: Users["username"], password: Users["password"]) {
    const user = await prisma.users.findUnique({
        where: { username }
    })
}
