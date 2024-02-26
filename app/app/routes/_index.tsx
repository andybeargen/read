import { Typography } from "@mui/material";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Lit Critters" },
    { name: "description", content: "Your one stop shop for reading books" },
  ];
};

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });

  return {};
};

export default function Index() {
  return (
    <>
      <Typography component="h1" variant="h1">
        Start reading
      </Typography>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </>
  );
}
