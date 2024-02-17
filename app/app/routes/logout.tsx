import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/utils/sessions.server";
import { Form, Link } from "@remix-run/react";
import { Typography } from "@mui/material";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <>
      <Typography variant="h1">Are you sure you want to logout?</Typography>
      <Form method="post" action="/logout">
        <button>Logout</button>
      </Form>
      <Link to="/">Never mind</Link>
    </>
  );
}
