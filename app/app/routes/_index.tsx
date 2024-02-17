import { Typography } from "@mui/material";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, redirect } from "@remix-run/react";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "Lit Critters" },
    { name: "description", content: "Your one stop shop for reading books" },
  ];
};

// detect if user is logged in
export async function loader({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/dashboard");
  }

  return {};
}

export default function Index() {
  return (
    <>
      <Typography component="h1" variant="h1">Start reading</Typography>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </>
  );
}
