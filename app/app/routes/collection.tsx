import { LoaderFunction } from "@remix-run/node";
import { AuthenticatedLayout } from "~/components";
import { authenticator } from "~/utils/auth.server";
import { Search as SearchIcon, CloudUpload } from "@mui/icons-material";
import { getSession, commitSession } from "../utils/sessions.server";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createCritter, getRandomCritter, getUserCritters } from "~/models/critter.server";
import { parseEpub } from "~/utils/epub";
import { Form, Link, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  styled,
  InputBase,
  Paper,
  Link,
  TextField,
  Typography,
  AppBar
} from "@mui/material";

const BookCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#808080",
  padding: theme.spacing(1),
  borderRadius: 15,
  height: 160,
  width: 110,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 100,
  border: "2px solid #0c174b",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CritterCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#808080",
  padding: theme.spacing(1),
  borderRadius: 15,
  height: 160,
  width: 110,
}));


export default function CollectionRoute() {
  const { critters } = useLoaderData<typeof loader>();
  const [searchItem, setSearchItem] = useState("");
  const [open, setOpen] = useState(false);

  const submit = useSubmit();

  const handleInputChange = (e: { target: { value: any } }) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  const getFilteredCritters = (critters: any) => {
    return critters.filter((critter: any) =>
      critters.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      critters.id.toLowerCase().includes(searchItem.toLowerCase()));
  }



  return <AuthenticatedLayout>



<AppBar position="static" elevation={0}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "#de7d37",
          }}
        >
          <Box
            alignItems={"center"}
            display={"flex"}
            justifyContent={"center"}
            padding={"10px"}
          >
            <Typography
              variant="h1"
              style={{ wordWrap: "break-word" }}
              color="#0c174b"
              padding="30px 0px 0px 0px"
            >
              Critter Collection
            </Typography>
          </Box>

          <Box
            alignItems={"center"}
            display={"flex"}
            justifyContent={"center"}
            padding={"10px"}
          >
            <Typography
              variant="h6"
              style={{ wordWrap: "break-word" }}
              color="#0c174b"
              padding="30px 0px 0px 0px"
            >
              Find the critters you obtained using the critter collection search,
               and favorite the critters you would like to upgrade with your reading
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "15px 30px",
            }}
          >
          </Box>

          <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                value={searchItem}
                onChange={handleInputChange}
              />
            </Search>
        </Box>
      </AppBar>

      <Box
                  sx={{
                    width: 110,
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    style={{ wordWrap: "break-word" }}find
                    component="div"
                    display="block"
                    color="#0c174b"
                  >
                    {critters.name}
                  </Typography>
                  <Typography
                    noWrap={true}
                    component="div"
                    display="block"
                    color="#0c174b"
                  >
                    {critters.name}
                  </Typography>
                </Box>

  </AuthenticatedLayout>;

}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  if (!user || user instanceof Error) {
    return {};
  } else {
    // get books
    let critters: any = user.id != undefined ? await getUserCritters(user.id) : [];
    critters.forEach((critter: any) => {
        if (critter.image) {
          critter.image = "data:image/jpeg;base64," + critter.image.toString('base64');
        } else {
          critter.image = "";
        }
    })

    return json(
      { critters }
    );
  }
}
