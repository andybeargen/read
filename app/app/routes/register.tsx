import { Typography } from "@mui/material";
import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { commitSession, getSession } from "~/utils/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });

  const session = await getSession(request.headers.get("Cookie"));

  const error = session.get("error");
  return json(
    { error },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

export async function action({ request, context }: ActionFunctionArgs) {
  return await authenticator.authenticate("register", request, {
    successRedirect: "/select-critter",
    failureRedirect: "/register",
    throwOnError: true,
    context,
  });
}

export default function Register() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <Typography component="h1" variant="h1">
        Register
      </Typography>

      {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}

      <Form method="post" action="/register">
        <label>
          Username: <input type="text" name="username" />
        </label>
        <label>
          Email: <input type="email" name="email" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </Form>
    </>
  );
}
