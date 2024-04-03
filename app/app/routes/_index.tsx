import { Box, Container, Typography, Button } from "@mui/material";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Lit Critters" },
    { name: "description", content: "Your one stop shop for reading books" },
  ];
};

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });

  return {};
};

export default function Index() {
  return (
    <Box
      className="index-page-box"
      sx={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("/paper_texture.jpg")',
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          height: "50vh", // full viewport height
          display: "flex",
          alignItems: "center", // vertical alignment
          justifyContent: "center", // horizontal alignment
        }}
        component="h1"
      >
        <img
          src="/logo.png"
          alt="Lit Critters"
          style={{ maxWidth: "100%", maxHeight: "100%" }} // to ensure the image is responsive and does not overflow
        />
      </Container>

      <Typography component="h5" variant="h5" textAlign="center" gutterBottom>
        Where reading lit books gets you the Littist of Critters. Just upload a
        epub and read away!
      </Typography>

      <Box
        mt={3}
        mb={2}
        sx={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>

        <Button variant="contained" component={Link} to="/register">
          Register
        </Button>
      </Box>
    </Box>
  );
}
