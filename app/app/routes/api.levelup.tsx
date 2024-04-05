import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { levelUpCritter, userHasCritter } from "~/models/critter.server";
import { addCoins, removeCoins } from "~/models/user.server";
import { authenticator } from "~/utils/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  if (user instanceof Error || !user) {
    redirect("/");
    return json({error: "No user"});
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    }
  });
  if (!userData || userData instanceof Error) {
    redirect("/");
    return json({error: "No user"});
  }

  if (userData.coins < 100) {
    return json({ error: "Insufficient amount of coins to level up critter" })
  }

  const body = await request.json();

  if (!Object.hasOwn(body, "userCritterId") &&  typeof body.userCritterId !== 'string') {
    return json({ error: "Invalid request" });
  }

  if (await userHasCritter(userData.id, body.userCritterId)) {
    await levelUpCritter(body.userCritterId);
    await removeCoins(userData.id, 100);
    return json({ status: "Success" });
  }
  return json({ error: "Unable to level up critter"});
}
