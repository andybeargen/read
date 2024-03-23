import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData } from '@remix-run/react';
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { prisma } from "~/db.server";
import { getUserById } from '~/models/user.server';
import { authenticator } from "~/utils/auth.server";
import { getSession, destroySession } from '~/utils/sessions.server';

export const action: ActionFunction = async ({ request, context }) => {
  // change the user's password if they submitted the form
  const session = await getSession(request.headers.get("Cookie"));

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  if (!user || user instanceof Error) {
    return {
      status: 401,
      headers: {
        "Content-Type": "text/html",
      },
      body: "Unauthorized",
    };
  }

  if (request.method.toLowerCase() === "post") {
    // get the form data

    // update the user's password
    await authenticator.authenticate("change-password", request, {
      successRedirect: "/dashboard",
      failureRedirect: "/settings",
      context
    });

    // log out the user
    await destroySession(session);

    // redirect to the dashboard
    return {
      status: 303,
      headers: {
        Location: "/dashboard",
      },
    };
  }

  return {
    status: 400,
    headers: {
      "Content-Type": "text/html",
    },
    body: "Method not allowed",
  };
}

export default function SettingsRoute() {
  const actionData = useActionData<typeof loader>();

  return (
    <AuthenticatedLayout>
      <Container sx={{ py: 4 }}>
        <Typography sx={{ textAlign: "center" }} variant="h1">
          Settings
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="body1">
          Change your personal information. Change your password. Change your
          email. Change your username. Change your life.
        </Typography>
      </Container>

      {actionData?.error ? <p>ERROR: {actionData?.error}</p> : null}

      <Box component={Form} method="post" sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}>
        <TextField fullWidth label="Email" type="email" id="email" autoComplete="email" name="email" />
        <TextField fullWidth label="Old Password" type="password" required id="oldPassword" name="oldPassword" />
        <TextField fullWidth label="New Password" type="password" id="newPassword" name="newPassword" />
        <TextField fullWidth label="Confirm New Password" type="password" id="confirmNewPassword" name="confirmNewPassword" />

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">Save Changes</Button>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return {};
};
