/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useState } from "react";
import ClientStyleContext from "~/contexts/ClientStyleContext";
import { CrittersTheme } from "./utils/theme.client";
import createEmotionCache from "@emotion/cache";
import { hydrateRoot } from "react-dom/client";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

// https://github.com/mui/material-ui/issues/30436#issuecomment-1003339715
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache({ key: "css" }));

  function reset() {
    setCache(createEmotionCache({ key: "css" }));
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

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
