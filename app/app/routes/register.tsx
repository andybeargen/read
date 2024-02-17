import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { createUser } from "~/models/user.server";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions";
import { Typography } from "@mui/material";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const username = form.get("username");

  let userId = null;
  let user;

  if (email && password && username) {
    console.log("Before");
    user = await createUser(String(username), String(email), String(password));
    console.log("After");
    if (user) {
      userId = user.id;
      console.log(user);
    }
  }

  if (userId == null) {
    session.flash("error", "Invalid username/password");

    // Redirect back to the login page with errors.
    return redirect("/register", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", userId);

  // Login succeeded, send them to the home page.
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Register() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <>
      <Typography component="h1" variant="h1">
        {" "}
        Register{" "}
      </Typography>
      {error ? <div className="error">{error}</div> : null}
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
