import {
    Box,
    Card,
    Container
} from "@mui/material";

/**
 * Contains the layout for the login card
 */
export const LoginCardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(45deg, #285cc455, #de7d3755), linear-gradient(#fffe, #fffe), url(/background.png) center center / 75% repeat",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
            }}
          >
            { children }
          </Card>
        </Container>
      </Box>
    );
  }
