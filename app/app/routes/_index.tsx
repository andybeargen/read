import { Typography } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Lit Critters" },
    { name: "description", content: "Your one stop shop for reading books" },
  ];
};

export default function Index() {
  return (
    <>
      <Typography component="h1" variant="h1">Start reading</Typography>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </>
  );
}
