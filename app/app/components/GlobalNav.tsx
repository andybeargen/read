import {
  AutoStoriesRounded,
  EggRounded,
  HomeRounded,
  PetsRounded,
  SettingsRounded,
  AutoStoriesOutlined,
  EggOutlined,
  HomeOutlined,
  PetsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";

declare type NavLink = {
  label: string;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
  to: string;
};

/**
 * Global navigation component
 */
export const GlobalNav = () => {
  const location = useLocation();

  const NavLinks: NavLink[] = [
    {
      label: "Home",
      activeIcon: <HomeRounded />,
      inactiveIcon: <HomeOutlined />,
      to: "/dashboard",
    },
    {
      label: "Collection",
      activeIcon: <PetsRounded />,
      inactiveIcon: <PetsOutlined />,
      to: "/collection",
    },
    {
      label: "Library",
      activeIcon: <AutoStoriesRounded />,
      inactiveIcon: <AutoStoriesOutlined />,
      to: "/library",
    },
    {
      label: "Hatchery",
      activeIcon: <EggRounded />,
      inactiveIcon: <EggOutlined />,
      to: "/hatchery",
    },
  ];

  const getActiveIndex = () => {
    const path = location.pathname;
    const index = NavLinks.findIndex((link) => link.to === path);
    return index;
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 69420 }}
      elevation={3}
      component="nav"
    >
      <BottomNavigation showLabels value={getActiveIndex()}>
        {NavLinks.map((link, index) => (
          <BottomNavigationAction
            key={index}
            label={link.label}
            icon={
              index === getActiveIndex() ? link.activeIcon : link.inactiveIcon
            }
            component={Link}
            to={link.to}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
