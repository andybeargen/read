import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { LoginCardLayout } from "~/components/LoginCardLayout";
import { authenticator } from "~/utils/auth.server";
import { commitSession, getSession } from "~/utils/sessions.server";

/**
 * Called when the user visits the login page
 */
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

/**
 * Called when the user submits the login form
 */
export const action: ActionFunction = async ({ request, context }) => {
  return await authenticator.authenticate("email-pass", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    // throwOnError: true,
    context,
  });
};

export default function Login() {
  const actionData = useActionData<typeof loader>();

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

      <Form action="/login" method="post">
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
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            {"Don't have an account? "}
            <Link href="/register" variant="body2">
              {"Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Form>
    </LoginCardLayout>
  );
}
