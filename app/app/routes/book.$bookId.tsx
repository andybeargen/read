import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { ReactReader } from 'react-reader'
import {
    Box,
    Container,
    Button
  } from "@mui/material";
import { ZoomIn, ZoomOut} from "@mui/icons-material";
import { prisma } from "~/db.server";
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { Book } from "@prisma/client";
import { AuthenticatedLayout } from "~/components";

import type { Contents, Rendition, NavItem } from 'epubjs'


export default function Book() {
    const temp_url = "https://react-reader.metabits.no/files/alice.epub";


    

    const book: Book = useLoaderData<typeof loader>();
    const [largeText, setLargeText] = useState(false)
    const [page, setPage] = useState('')
    const rendition = useRef<Rendition | undefined>(undefined)
    const [location, setLocation] = useState<string | number>(0)
    const toc = useRef<NavItem[]>([])
    useEffect(() => {
      rendition.current?.themes.fontSize(largeText ? '140%' : '100%')
    }, [largeText])

    return (
        <AuthenticatedLayout>
            <Container
            sx={{
            height: "100vh",
            }}
            >
              <Box style={{ height: '90%'}}>
              <ReactReader
                url={temp_url}
                location={location}
                tocChanged={(_toc) => (toc.current = _toc)}
                locationChanged={(loc: string) => {
                  setLocation(loc)
                  if (rendition.current && toc.current) {
                    const { displayed, href } = rendition.current.location.start
                    const chapter = toc.current.find((item) => item.href === href)
                    setPage(
                      `${displayed.page} of ${displayed.total} in current chapter`
                    )
                  }
                }}
                getRendition={(_rendition: Rendition) => {
                  rendition.current = _rendition
                  _rendition.hooks.content.register((contents: Contents) => {
                    const body = contents.window.document.querySelector('body')
                    if (body) {
                      body.oncontextmenu = () => {
                        return false
                      }
                    }
                  })
                  rendition.current.themes.fontSize(largeText ? '140%' : '100%')
                }}
                
              />
              
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              >
                <Button onClick={() => setLargeText(true)} className="btn">
                  <ZoomIn />
                </Button>
                <Button onClick={() => setLargeText(false)} className="btn">
                  <ZoomOut />
                </Button>
                <Box>{page}</Box>
            </Box>
            </Container>
          
        </AuthenticatedLayout>
      );
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request, params }) => {
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

    const bookData = await prisma.book.findUnique({
      where: {
        id: params.bookId,
      },
    });

    return bookData;
  };
  