import { LoaderFunction } from "@remix-run/node";
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { authenticator } from "~/utils/auth.server";
import { getUserCritters } from "~/models/critter.server";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AppBar, Box, Button, Card, CardContent, Container, Grid, IconButton, InputBase, Typography, styled } from "@mui/material";
import { Search as SearchIcon, ArrowBack as BackIcon } from "@mui/icons-material";
import { useState } from "react";
import { CoinIcon } from "~/components";

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

const CoinCount = ({ count }: { count: number }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      gap={1}
      bgcolor={"#0045bd"}
      borderRadius={"30px"}
      px={1}
      py={0.5}
    >
      <Typography
        fontFamily={"monospace"}
        variant="h6"
        component="h1"
        color={"white"}
      >
        {count}
      </Typography>
      <CoinIcon style={{ width: "30px" }} />
    </Box>
  );
};

export default function CollectionRoute() {
  const { critters, user } = useLoaderData<typeof loader>();
  const [searchItem, setSearchItem] = useState("");
  const [currentCritter, setCurrentCritter] = useState(null);

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
      {!currentCritter
        ? (<>
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
  
          <Grid container spacing={2} justifyContent='left' alignItems='flex-start' sx={{ paddingX: '30%', paddingTop: '3rem', paddingBottom: '7rem' }}>
            {getFilteredCritters(critters).map((critter) => (
              <Grid item xs={12} sm={6} md={4} key={critter.id}>
                <div onClick={() => { setCurrentCritter(critter) }} style={{cursor: 'pointer'}}>
                  <Card  sx={{ 
                    border: '1px solid #de7d37', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
                    borderRadius: '15px',
                    backgroundImage: 'linear-gradient(to right, #FFCC80, #80D8FF)'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '1rem', height: '160px' }}>
                      <img 
                      src={`/critters/${critter.critter.image}`} 
                      alt={critter.critter.name} 
                      style={{ maxWidth: '160px', maxHeight: '160px' }}
                      />
                    </Box>
                    <CardContent sx={{backgroundColor: '#fff'}}>
                      <Typography variant="h3" sx={{ mt: 1, color: '#0c174b' }}>
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
                </div>
              </Grid>
            ))}
          </Grid>
        </>)
        : (<>
          <Container
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                background: "linear-gradient(to top, #E89B60, #98C9FF)",
                height: "50vh",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: -1,
                borderRadius: "0 0 9999% 9999%",
              }}
            />

            <Container
              sx={{
                display: "flex",
                height: "7%",
                justifyContent: "space-between",
                maxWidth: "1200px",
                padding: 0,
                position: "relative",
                top: "2rem",
              }}
            >
              <IconButton
                aria-label="settings"
                style={{ height: "100%" }}
                component={Button}
                onClick={ () => setCurrentCritter(null) }
              >
                <BackIcon sx={{ height: "100%", position: "relative", fill: "#0045bd", transform: "scale(1.8)" }} />
              </IconButton>

              <CoinCount count={user.coins} />
            </Container>

            <img
              src={`/critters/${currentCritter.critter.image}`}
              alt="critter"
              style={{ maxWidth: "300px", marginTop: "7%" }}
            />
            <Typography
              variant="h3"
              component="h1"
              fontFamily={"monospace"}
              fontWeight={"bold"}
              color={"#0045bd"}
              sx={{marginTop: "5rem", marginBottom: "1rem"}}
            >
              {currentCritter.critter.name}
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              fontFamily={"monospace"}
              fontWeight={"bold"}
              color={"#0045bd"}
            >
              Type: {currentCritter.critter.type}
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              fontFamily={"monospace"}
              fontWeight={"bold"}
              color={"#0045bd"}
              sx={{marginBottom: "1rem"}}
            >
              Level: {currentCritter.level}
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              fontFamily={"monospace"}
              fontWeight={"bold"}
              color={"#0045bd"}
              sx={{marginBottom: "1rem"}}
            >
              Description
            </Typography>
            <Typography sx={{textAlign: 'center'}}>
              {currentCritter.critter.description}
            </Typography>
          </Container>
        </>)
      }
      
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
  return { critters, user };
};
