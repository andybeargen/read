import {
  Button,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { LoginCardLayout } from "~/components/LoginCardLayout";
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
    successRedirect: "/",
    failureRedirect: "/register",
    throwOnError: true,
    context,
  });
}

export default function Register() {
  const actionData = useActionData<typeof loader>();
  const [clicked, setClicked] = useState(false);

  return (
    <LoginCardLayout>
      <Typography
        component="h1"
        variant="h3"
        style={{ textAlign: "center" }}
      >
        Welcome to LitCritters
      </Typography>

      {actionData?.error ? (
        <p>ERROR: {actionData?.error?.message}</p>
      ) : null}

      <Form action="/register" method="post" onSubmit={() => setClicked(true)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        <Button
          type="submit"
          fullWidth
          component="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={clicked}
        >
          {clicked ? "Registering..." : "Register"}
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            {"Already have an account? "}
            <Link href="/login" variant="body2">
              {"Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Form>
    </LoginCardLayout>
  );
}
