import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { hatchCritter } from "~/models/critter.server";
import { authenticator } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
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

  let critter = await hatchCritter(userData.id);
  if (critter) {
    return json({ critter });
  }
  return json({ error: "No critter"});
}
