import { authenticator } from "~/utils/auth.server";
import { prisma } from "~/db.server";
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CardContent, Container, Typography, Button, Box } from "@mui/material";
import { useState } from "react";

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
  if (userData.UserCritter.length > 0) {
    return redirect("/dashboard");
  }
  if (!userData || userData instanceof Error) {
    return redirect("/");
  }
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
      window.history.pushState(null, "", "/dashboard");
      window.history.replaceState(null, "", "/dashboard");
      window.location.href = "/dashboard";
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2em",
        maxHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to top, #E89B60, #98C9FF)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: "center",
          flex: "0 0 10vh",
        }}
        gutterBottom
      >
        Welcome to LitCritters! To begin your reading journey, please select a
        starting critter from the options below
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          maxHeight: "70vh",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        {critters.map((critter: any) => (
          <Box
            key={critter.id}
            sx={{
              maxWidth: 800,
              borderRadius: 2,
              boxShadow: 3,
              background: "linear-gradient(to right, #FFC371, #FF5F6D)",
              border:
                critter.id === selectedCritter ? "3px solid #a32727" : "none",
              marginBottom: 2,
              cursor: "pointer",
              "& > *": {
                pointerEvents: "none",
              },
              "&:hover": {
                filter: "brightness(1.1)",
              },
            }}
            onClick={() => {
              setSelectedCritter(critter.id);
            }}
          >
            <img
              style={{
                height: 140,
                width: "100%",
                objectFit: "contain",
              }}
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
          </Box>
        ))}
      </Box>
      <Box
        mt={2}
        sx={{
          flex: "0 0 10vh",
        }}
      >
        <Button
          onClick={handleConfirmClick}
          sx={{
            background: "linear-gradient(to right, #FFC371, #FF5F6D)",
            color: "text.primary",
            fontWeight: 700,
            "&:hover": {
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            },
          }}
        >
          CONFIRM
        </Button>
      </Box>
    </Container>
  );
}
