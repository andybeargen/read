import { LoaderFunction } from "@remix-run/node";
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { authenticator } from "~/utils/auth.server";

export default function HatcheryRoute() {
  return <AuthenticatedLayout>Settings</AuthenticatedLayout>;
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return {};
}
