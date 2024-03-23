import { User } from "@prisma/client";
import { ActionFunction, ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { prisma } from "~/db.server";
import { hatchCritter } from "~/models/critter.server";
import { authenticator } from "~/utils/auth.server";

async function hatchCritterAndNotify() {
  const response = await fetch("http://localhost:3000/api/hatch");
  const responseJson = await response.json();
  const error = responseJson?.error;
  const critter = responseJson?.critter;

  if (error) {
    alert(error);
  } else {
    alert("Obtained " + critter.name);
  }
}

export default function HatcheryRoute() {
  let user: User = useLoaderData<typeof loader>();

  return (
    <AuthenticatedLayout>
      <h1>
        Hatchery
      </h1>
      <button onClick={hatchCritterAndNotify}>Hatch</button>
    </AuthenticatedLayout>
  );
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  if (user instanceof Error || !user) {
    redirect("/");
    return null;
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    }
  });
  if (!userData || userData instanceof Error) {
    redirect("/");
    return null;
  }

  return userData;
};
