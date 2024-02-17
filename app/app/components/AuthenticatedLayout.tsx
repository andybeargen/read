import { Box } from "@mui/material";
import { GlobalNav } from "./GlobalNav";
import { forwardRef } from "react";

/**
 * This is the layout for authenticated users that includes the global navigation
 */
export const AuthenticatedLayout = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <Box
      component="main"
      ref={ref}
      style={{
        height: "100vh",
      }}
    >
      <GlobalNav />
      {children}
    </Box>
  );
});

AuthenticatedLayout.displayName = "AuthenticatedLayout";
