import * as React from 'react';
import {   
    Link,
    Meta,
    Links,
    useLoaderData, } from '@remix-run/react';
import { Button,
    Typography,
    Box,
    createTheme,
    InputBase,
    AppBar,
    styled,
    alpha,
    Grid,
    Paper,
} from '@mui/material';
import { 
    Search as SearchIcon,
    AutoStories,
} from '@mui/icons-material';

const theme = createTheme({
    palette: {
      background: {
        paper: '#fff',
      },
      text: {
        primary: '#0c174b',
        secondary: '#fff',
      },
      primary: {
        main: '#de7d37'
      }
    },
    shape: {
      borderRadius: 50,
    }
});

const fakeBooks = [
  {
    _id: 1,
    title: 'Book1',
    author: "author1",
    genre: "genre1",
    description: "",
    image: "",
    usersId: 1,
  },
  {
    _id: 2,
    title: 'Book2',
    author: "author2",
    genre: "genre2",
    description: "",
    image: "",
    usersId: 1,
  },
  {
    _id: 3,
    title: 'Book3',
    author: "author3",
    genre: "genre3",
    description: "",
    image: "",
    usersId: 1,
  },
];

const BookCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#d3d3d3',
  padding: theme.spacing(1),
  borderRadius: 15,
  height: 140,
  width: 100,
}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: '2px solid #0c174b',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function Library() {  
  return (
    <Box
          sx={{
              flexGrow: 1,
          }}
      >
        <AppBar position="static">
            <Box sx={{
                display: 'flex',
                flexDirection:'column',
                bgcolor: '#de7d37'
            }}>
                <Box
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                    padding={"10px"}
                >
                  <Typography
                        variant="h4"
                        fontWeight='bold'
                        style={{ wordWrap: "break-word" }}
                        component="div"
                        display="block"
                        color="#0c174b"
                        padding="30px 0px 0px 0px"
                    >
                    Library
                    </Typography>
                </Box>
                
                <Box sx={{
                    padding: '15px 30px 15px 30px',
                }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                </Box>
            </Box>
        </AppBar>
              
        <Box sx={{
          padding: "10px",
          alignItems: "right"
        }}>
          <Button sx={{
            borderRadius: 10,
            bgcolor: "#0c174b",
            color: "#fff",
          }}
              variant="contained" component={Link} to="/BookUploadBook">
              Upload a book
          </Button>
        </Box>

        <Box sx={{ 
          flexGrow: 1,
          padding: "10px",
        }}>
          <Grid container sx={{ flexGrow: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid container justifyContent="center" spacing={5}>
              {[0, 1, 3, 4, 5, 6, 7, 8].map((value) => (
                <Grid key={value} item>
                  <BookCard sx={{ 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <AutoStories fontSize='large'/>
                  </BookCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
    </Box>
  );
}
