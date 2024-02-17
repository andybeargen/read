import { BottomNavigation, Button } from "@mui/material";
import { Link } from "@remix-run/react";

/**
 * Global navigation component
 */
export const GlobalNav = () => {
  return (
    <BottomNavigation
      sx={{
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        pb: 2,
        borderTop: "1px solid #E89B60",
        width: "100%",
      }}
    >
      <Link to={"/collection"}>
        <Button
          variant="contained"
          color="primary"
          style={{ fontSize: "0.5em" }}
        >
          Critter Collection
        </Button>
      </Link>
      <Link to={"/"}>
        <Button variant="contained" color="primary">
          Home
        </Button>
      </Link>
      <Link to={"/hatchery"} style={{ textDecoration: "none" }}>
        {/* <EggIcon style={{ width: "40px" }} /> */}
        <Button variant="contained" color="primary">
          Hatchery
        </Button>
      </Link>
    </BottomNavigation>
  );
};
