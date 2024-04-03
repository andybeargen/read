import { Link as MUILink, Button, Typography } from "@mui/material";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { LoginCardLayout } from "~/components/LoginCardLayout";
import { authenticator } from "~/utils/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function LogoutRoute() {
  return (
    <LoginCardLayout>
      <Typography component="h1" variant="h3" style={{ textAlign: "center" }}>
        Are you sure you want to logout?
      </Typography>
      <Form method="post" action="/logout">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Logout
        </Button>
      </Form>
      <MUILink component={Link} to="/">
        Never mind
      </MUILink>
    </LoginCardLayout>
  );
}
