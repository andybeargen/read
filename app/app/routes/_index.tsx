import { Box, Container, Typography, Button } from "@mui/material";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import './landing.css'; // The css file for the landing page


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
}

export default function Index() {
  return (
    <Box className="index-page-box" display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Container className="indexx" style={{
        height: '50vh', // full viewport height
        display: 'flex',
        alignItems: 'center', // vertical alignment
        justifyContent: 'center', // horizontal alignment
      }}>
        <img
          src="/pikachuonbooks.png"
          alt="critter"
          style={{ maxWidth: '100%', maxHeight: '100%' }} // to ensure the image is responsive and does not overflow
        />
      </Container>

      <Typography component="h1" variant="h1" textAlign="center">
        Lit Critters
      </Typography>

      <Typography component="h5" variant="h5" textAlign="center">
        Where reading lit books gets you the Littist of Critters. 
        Just upload a pdf/epub and read away!
      </Typography>

      <Box mt={3} mb={2}>
        <Link to="/login" style={{ textDecoration: 'none', margin: '10px' }}>
          <Button variant="contained">
            Login
          </Button>
        </Link>

        <Link to="/register" style={{ textDecoration: 'none', margin: '10px' }}>
          <Button variant="contained">
            Register
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
