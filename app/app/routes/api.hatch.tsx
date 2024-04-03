import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { hatchCritter } from "~/models/critter.server";
import { addCoins, removeCoins } from "~/models/user.server";
import { authenticator } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  if (user instanceof Error || !user) {
    redirect("/");
    return json({ error: "No user" });
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!userData || userData instanceof Error) {
    redirect("/");
    return json({ error: "No user" });
  }

  if (userData.coins < 500) {
    return json({ error: "Insufficient amount of coins to hatch critter" });
  }

  let critter = await hatchCritter(userData.id);
  if (critter) {
    await removeCoins(userData.id, 500);
    return json({ critter });
  }
  return json({ error: "Unable to hatch critter" });
}
