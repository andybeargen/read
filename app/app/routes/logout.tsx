import { Typography } from "@mui/material";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: "/login" });
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
