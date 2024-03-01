import { withEmotionCache } from "@emotion/react";
import { CssBaseline, Typography } from "@mui/material";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { useContext, useEffect } from "react";
import ClientStyleContext from "./contexts/ClientStyleContext";

const Document = withEmotionCache((_, emotionCache) => {
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });

    // reset cache to reapply global styles
    clientStyleData.reset();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <CssBaseline />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
});

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Typography variant="h1">
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
              ? error.message
              : "Unknown Error"}
        </Typography>
        <Scripts />
      </body>
    </html>
  );
}

export default Document;
