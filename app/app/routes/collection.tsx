import { LoaderFunction } from "@remix-run/node";
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { authenticator } from "~/utils/auth.server";
import { getUserCritters } from "~/models/critter.server";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export default function CollectionRoute() {
  const { critters } = useLoaderData();
  return <AuthenticatedLayout>
    <h1>Collection</h1>
    <ul>
      {critters.map((critter) => (
        <li key={critter.id}>
          <h2>{critter.critter.name}</h2>
          <p>Level: {critter.level}</p>
          <p>XP: {critter.xp}</p>
          <p>Type: {critter.critter.type}</p>
          <p>{critter.critter.description}</p>
        </li>
      ))}
    </ul>
  </AuthenticatedLayout>;
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  if (user instanceof Error || !user) {
    redirect("/");
    return null;
  }
 // get all the user's critters
  const critters = await getUserCritters(user.id);
  return { critters };
};
