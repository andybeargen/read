import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Paper,
} from "@mui/material";
import { Link, useLocation } from "@remix-run/react";
import HomeIcon from "~/components/icons/HomeIcon";
import EggIcon from "~/components/icons/EggIcon";
import CollectionIcon from "~/components/icons/CoinIcon";
import BookIcon from "~/components/icons/BookIcon";
import {
  AutoStoriesRounded,
  EggRounded,
  HomeRounded,
  PetsRounded,
} from "@mui/icons-material";

declare type NavLink = {
  label: string;
  icon: JSX.Element;
  to: string;
};

/**
 * Global navigation component
 */
export const GlobalNav = () => {
  const location = useLocation();

  const NavLinks: NavLink[] = [
    { label: "Home", icon: <HomeRounded />, to: "/dashboard" },
    { label: "Collection", icon: <PetsRounded />, to: "/collection" },
    { label: "Library", icon: <AutoStoriesRounded />, to: "/library" },
    { label: "Hatchery", icon: <EggRounded />, to: "/hatchery" },
  ];

  const getActiveIndex = () => {
    const path = location.pathname;
    const index = NavLinks.findIndex((link) => link.to === path);
    return index;
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
      component="nav"
    >
      <BottomNavigation showLabels value={getActiveIndex()}>
        {NavLinks.map((link, index) => (
          <BottomNavigationAction
            key={index}
            label={link.label}
            icon={link.icon}
            component={Link}
            to={link.to}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
