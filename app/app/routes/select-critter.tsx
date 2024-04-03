import { authenticator } from "~/utils/auth.server";
import { User } from "@prisma/client";
import { prisma } from "~/db.server";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActionArea,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import pkg from "react-router-dom";
const { useHistory } = pkg;

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  if (user instanceof Error || !user) {
    return redirect("/");
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      UserCritter: true,
    },
  });
  // check if user has critters, if they do redirect to /dashboard
  if (userData.UserCritter.length > 0) {
    return redirect("/dashboard");
  }
  if (!userData || userData instanceof Error) {
    return redirect("/");
  }
  // get 3 random critters
  const critters = await prisma.critter.findMany({
    take: 3,
    orderBy: {
      id: "desc",
    },
  });
  return {
    user,
    critters,
  };
};

export default function SelectCritter() {
  let { user, critters } = useLoaderData<typeof loader>();
  const [selectedCritter, setSelectedCritter] = useState<string | null>(null);

  async function handleConfirmClick() {
    if (!selectedCritter) return;

    let response = await fetch("/api/assign-critter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, critterId: selectedCritter }),
    });

    if (response.ok) {
      const history = useHistory();
      history.replace("/dashboard");
    }
  }

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      style={{ paddingTop: "2em" }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to LitCritters! To begin your reading journey, please select a
        starting critter from the options below
      </Typography>
      <Box
        style={{
          background: "linear-gradient(to top, #E89B60, #98C9FF)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        spacing={2}
        direction="column"
      >
        {critters.map((critter: any) => (
          <Grid item key={critter.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 800,
                borderRadius: 2,
                boxShadow: 3,
                background: "linear-gradient(to right, #FFC371, #FF5F6D)",
                border:
                  critter.id === selectedCritter ? "5px solid #a32727" : "none",
              }}
            >
              <CardActionArea onClick={() => setSelectedCritter(critter.id)}>
                <img
                  style={{ height: 140, width: "100%", objectFit: "contain" }}
                  src={`/critters/${critter.image}`}
                  alt={critter.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div" fontWeight={700}>
                    {critter.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={700}
                  >
                    {critter.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Grid container justifyContent="center">
          <Button
            sx={{
              backgroundColor: "#98C9FF",
              color: "#0045bd",
              fontWeight: 700,
            }}
            onClick={handleConfirmClick}
          >
            CONFIRM
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
