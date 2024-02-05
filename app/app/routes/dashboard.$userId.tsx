import { Link } from "@remix-run/react";
import {
  BottomNavigation,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import BookIcon from "../components/BookIcon";

export default function Dashboard() {
  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          background: "linear-gradient(to top, #E89B60, #98C9FF)",
          height: "50vh",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: -1,
          borderRadius: "0 0 50% 50%",
        }}
      ></div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pl: 0,
          pr: 0,
          height: "7%",
        }}
      >
        <Link to={"/settings"}>
          <img
            src={
              "https://static.vecteezy.com/system/resources/previews/009/373/827/original/setting-3d-icon-png.png"
            }
            alt="settings"
            style={{ width: "50px" }}
          />
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#0045bd",
            borderRadius: "30px",
            px: 1,
            py: 0.5,
          }}
        >
          <Typography
            fontFamily={"monospace"}
            variant="h6"
            component="h1"
            color={"white"}
          >
            100
          </Typography>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/7880/7880066.png"}
            alt="coin"
            style={{ width: "30px" }}
          />
        </Box>
      </Container>
      <Container
        sx={{
          height: "93%",
          display: "flex",
          flexDirection: "column",
          pl: 0,
          pr: 0,
          justifyContent: "space-between",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            pt: 10,
          }}
        >
          <img
            src="/Uncommon_Squirtle.gif"
            alt="critter"
            style={{ width: "200px" }}
          />
          <Typography
            variant="h5"
            component="h1"
            fontFamily={"monospace"}
            color={"#0045bd"}
          >
            Squirtle
          </Typography>
        </Container>
        <Link
          to={"/library/1"}
          style={{
            textDecoration: "none",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            bgcolor={"#70c6ff"}
            fontSize={"2em"}
            gap={2}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            width={"80%"}
            height={"80px"}
            borderRadius={"50px"}
          >
            <Typography
              variant="h4"
              component="h1"
              fontFamily={"monospace"}
              color={"#0045bd"}
            >
              READ
            </Typography>
            <BookIcon style={{ width: "40px", marginTop: "5px" }} />
          </Box>
        </Link>
        <BottomNavigation sx={{ gap: 2, justifyContent: "center" }}>
          <Link to={"/"}>
            <Button variant="contained" color="primary">
              Home
            </Button>
          </Link>
          <Link to={"/dashboard"}>
            <Button variant="contained" color="primary">
              Dashboard
            </Button>
          </Link>
        </BottomNavigation>
      </Container>
    </div>
  );
}
