import { authenticator } from "~/utils/auth.server";
import { User } from "@prisma/client";
import { prisma } from "~/db.server";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  if (user instanceof Error || !user) {
    return redirect("/");
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      UserCritter: true,
    },
  });
  // check if user has critters, if they do redirect to /dashboard
  if (userData.UserCritter.length > 0) {
    return redirect("/dashboard");
  }
  if (!userData || userData instanceof Error) {
    return redirect("/");
  }
  // get 3 random critters
  const critters = await prisma.critter.findMany({
    take: 3,
    orderBy: {
      id: "desc",
    },
  });
  return {
    user,
    critters,
  };
};

export default function SelectCritter() {
  let { user, critters } = useLoaderData<typeof loader>();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let critterId = new FormData(event.target).get("critter");
    let response = await fetch("/api/assign-critter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, critterId }),
    });
    if (response.ok) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div>
      <h1>Select a critter</h1>
      <Form method="post" onSubmit={handleSubmit}>
        {critters.map((critter: any) => (
          <label key={critter.id}>
            <input type="radio" name="critter" value={critter.id} />
            {critter.name}
          </label>
        ))}
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
