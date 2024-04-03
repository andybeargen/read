import { LoaderFunction } from "@remix-run/node";
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { authenticator } from "~/utils/auth.server";
import { getUserCritters } from "~/models/critter.server";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AppBar, Box, Card, CardContent, Grid, InputBase, Typography, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState } from "react";

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

export default function CollectionRoute() {
  const { critters } = useLoaderData();
  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e: { target: { value: any } }) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  const getFilteredCritters = (critters: any) => {
    return critters.filter((critter: any) => 
      critter.critter.name.toLowerCase().includes(searchItem.toLowerCase())
    );
  }

  return (
    <AuthenticatedLayout>
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
              variant="h4"
              style={{ wordWrap: "break-word" }}
              color="#0c174b"
              padding="30px 0px 0px 0px"
            >
              Critter Collection
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "15px 30px",
            }}
          >
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
        </Box>
      </AppBar>

      <Grid container spacing={2} justifyContent='left' alignItems='flex-start' sx={{ paddingX: '30%', paddingTop: '3rem' }}>
        {getFilteredCritters(critters).map((critter) => (
          <Grid item xs={12} sm={6} md={4} key={critter.id}>
            <Card sx={{ 
              border: '1px solid #de7d37', 
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
              borderRadius: '15px',
              padding: '1rem',
              backgroundImage: 'linear-gradient(to right, #FFCC80, #80D8FF)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src={`/critters/${critter.critter.image}`} 
                    alt={critter.critter.name} 
                    style={{ maxWidth: '160px', maxHeight: '160px' }}
                  />
                </Box>
                <Typography variant="h3" sx={{ mt: 4, color: '#0c174b' }}>
                  {critter.critter.name}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Type: {critter.critter.type}
                </Typography>
                <Typography variant="h6">
                  Level: {critter.level}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AuthenticatedLayout>
  );
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  if (user instanceof Error || !user) {
    redirect("/");
    return null;
  }
 // get all the user's critters
  const critters = await getUserCritters(user.id);
  return { critters };
};
