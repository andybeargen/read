import { json } from "@remix-run/node";
import { prisma } from "~/db.server";

export async function action({ request }) {
  const { userId, critterId } = await request.json();

  try {
    await prisma.userCritter.create({
      data: {
        userId,
        critterId,
      },
    });

    return json({}, { status: 200 });
  } catch (error) {
    return json({ status: 500 });
  }
}