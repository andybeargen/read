import * as React from "react";
import { useRef, useState } from "react";
import { ReactReader } from 'react-reader'
import {
    Box,
    Container
  } from "@mui/material";
import { prisma } from "~/db.server";
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { User } from "@prisma/client";
import { AuthenticatedLayout } from "~/components";

export const App = () => {
    const [location, setLocation] = useState<string | number>(0)
    return (
      <Box style={{ height: '90%' }}>
        <ReactReader
          url="https://react-reader.metabits.no/files/alice.epub"
          location={location}
          locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        />
      </Box>
    )
  }

export default function Book() {
    const user: User = useLoaderData<typeof loader>();
    return (
        <AuthenticatedLayout>
            <Container
            sx={{
            height: "100vh",
            }}
            >
                <App></App>
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
  