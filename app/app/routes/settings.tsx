import { Container, Typography } from "@mui/material";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { authenticator } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function SettingsRoute() {
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
