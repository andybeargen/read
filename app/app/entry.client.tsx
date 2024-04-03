/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useMemo, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import ClientStyleContext from "./contexts/ClientStyleContext";
import createEmotionCache from "./utils/createEmotionCache";
import { CrittersTheme } from "./utils/theme";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    [],
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

const hydrate = () =>
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ClientCacheProvider>
          <ThemeProvider theme={CrittersTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <RemixBrowser />
          </ThemeProvider>
        </ClientCacheProvider>
      </StrictMode>,
    );
  });

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
