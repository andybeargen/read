import { Box, Container, IconButton, Typography } from "@mui/material";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  AuthenticatedLayout,
  BookIcon,
  CoinIcon,
  SettingsIcon,
} from "~/components";
import { authenticator } from "~/utils/auth.server";
import { User } from "@prisma/client";
import { prisma } from "~/db.server";

const CoinCount = ({ count }: { count: number }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      gap={1}
      bgcolor={"#0045bd"}
      borderRadius={"30px"}
      px={1}
      py={0.5}
    >
      <Typography
        fontFamily={"monospace"}
        variant="h6"
        component="h1"
        color={"white"}
      >
        {count}
      </Typography>
      <CoinIcon style={{ width: "30px" }} />
    </Box>
  );
};

export default function Dashboard() {
  const user: User = useLoaderData<typeof loader>();
  const mainCritter = user.UserCritter;

  return (
    <AuthenticatedLayout>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            background: "linear-gradient(to top, #E89B60, #98C9FF)",
            height: "50vh",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1,
            borderRadius: "0 0 9999% 9999%",
          }}
        />

        <Container
          sx={{
            display: "flex",
            height: "7%",
            justifyContent: "space-between",
            maxWidth: "1200px",
            padding: 0,
            position: "relative",
            top: "2rem",
          }}
        >
          <IconButton
            aria-label="settings"
            style={{ height: "100%" }}
            component={Link}
            to={"/settings"}
          >
            <SettingsIcon style={{ height: "100%", position: "relative" }} />
          </IconButton>

          <CoinCount count={user.coins} />
        </Container>

        <Container
          sx={{
            height: "93%",
            display: "flex",
            flexDirection: "column",
            pl: 0,
            pr: 0,
            justifyContent: "space-between",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              pt: 10,
            }}
          >
            <img
              src={`/critters/${mainCritter.name}.gif`}
              alt="critter"
              style={{ maxWidth: "300px" }}
            />
            <Typography
              variant="h5"
              component="h1"
              fontFamily={"monospace"}
              fontWeight={"bold"}
              color={"#0045bd"}
              position={"absolute"}
              top={"51vh"}
            >
              {mainCritter.name}
            </Typography>
          </Container>

          <Link
            to={"/library"}
            style={{
              textDecoration: "none",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              bgcolor={"#D9F4FF"}
              fontSize={"2em"}
              gap={2}
              alignItems={"center"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              width={"80%"}
              height={"80px"}
              borderRadius={"50px"}
              border={"2px solid #E89B60"}
              color={"#0045bd"}
              mb={20}
              sx={{ "&:hover": { backgroundColor: "#001e6b", color: "white" } }}
            >
              <Typography variant="h4" component="h1" fontFamily={"monospace"}>
                READ
              </Typography>
              <BookIcon style={{ width: "40px", marginTop: "-5px" }} />
            </Box>
          </Link>
        </Container>
      </Container>
    </AuthenticatedLayout>
  );
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  if (user instanceof Error || !user) {
    redirect("/");
    return null;
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      UserCritter: true,
    },
  });
  if (!userData || userData instanceof Error) {
    redirect("/");
    return null;
  }
  const critterId = userData.UserCritter[0].critterId;
  userData.UserCritter = await prisma.critter.findUnique({
    where: { id: critterId },
  });
  return userData;
};
