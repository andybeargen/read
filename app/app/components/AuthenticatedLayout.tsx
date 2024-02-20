import { Box } from "@mui/material";
import { GlobalNav } from "./GlobalNav";
import { forwardRef } from "react";

/**
 * This is the layout for authenticated users that includes the global navigation
 *
 * Contrary to popular belief, this layout is not a "protected route" and does not
 * prevent unauthenticated users from accessing it. It is simply a layout that is
 * intended to be used for authenticated users.
 *
 * Thus, you must still ensure that the user is authenticated before rendering
 * this layout.
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
