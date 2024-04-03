import { Box, Container, Modal, Typography } from "@mui/material";
import { User } from "@prisma/client";
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { CoinIcon } from "~/components";
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { prisma } from "~/db.server";
import { hatchCritter } from "~/models/critter.server";
import { authenticator } from "~/utils/auth.server";

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

export default function HatcheryRoute() {
  let user: User = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);
  const [hatchedCritter, setHatchedCritter] = useState({
    name: "",
    image: "",
  });
  const handleClose = () => setOpen(false);

  async function hatchCritterAndNotify() {
    if (!user || user.coins < 500) {
      alert("Insufficient amount of coins to hatch critter");
      return;
    }

    const response = await fetch("http://localhost:3000/api/hatch");
    const responseJson = await response.json();
    const error = responseJson?.error;
    const critter = responseJson?.critter;

    if (error) {
      alert(error);
    } else {
      setHatchedCritter(critter);
      setOpen(true);
      user.coins -= 500;
    }
  }

  return (
    <AuthenticatedLayout>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.9)" } }}
      >
        <Container
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            display: "flex",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontFamily={"monospace"}
            fontWeight={"bold"}
            color="#E89B60"
          >
            You hatched a
          </Typography>
          <img src={`/critters/${hatchedCritter.image}`} alt="critter" />
          <Typography
            variant="h1"
            component="h1"
            fontFamily={"monospace"}
            fontWeight={"bold"}
            color="#98C9FF"
          >
            {hatchedCritter.name}
          </Typography>
        </Container>
      </Modal>

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
            justifyContent: "right",
            maxWidth: "1200px",
            padding: 0,
            position: "relative",
            top: "2rem",
          }}
        >
          <CoinCount count={user.coins} />
        </Container>
        <Container
          sx={{
            display: "flex",
            marginTop: 10,
            height: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontFamily={"monospace"}
            fontWeight={"bold"}
          >
            Hatchery
          </Typography>
          <img src={`/Egg.png`} alt="critter" />
          <div
            onClick={hatchCritterAndNotify}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
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
              <Typography
                variant="h4"
                component="h1"
                fontFamily={"monospace"}
                textTransform={"uppercase"}
              >
                Hatch for 500
              </Typography>
              <CoinIcon style={{ width: "40px", marginTop: "-5px" }} />
            </Box>
          </div>
        </Container>
      </Container>
    </AuthenticatedLayout>
  );
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
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
  });
  if (!userData || userData instanceof Error) {
    redirect("/");
    return null;
  }

  return userData;
};
