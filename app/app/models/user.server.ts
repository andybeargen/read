import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
    return prisma.user.findUnique({ where: { id } });
}

export async function createUser(username: User["username"], 
    email: User["email"],
    password: User["password"]) {

    console.log("Create User");
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if (userExists) {
        return null;
    }

    return prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
        },
    });
}

export async function loginUser(email: User["email"], password: User["password"]) {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return null;
    }

    return user;
}
