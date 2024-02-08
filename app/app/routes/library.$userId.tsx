import * as React from 'react';
import { useState } from 'react';
import {   
    Link,} from '@remix-run/react';
import { Button,
    Typography,
    Box,
    Container,
    InputBase,
    AppBar,
    styled,
    Grid,
    Paper,
} from '@mui/material';
import { 
    Search as SearchIcon,
} from '@mui/icons-material';

const fakeBooks = [
  {
    _id: 1,
    title: 'Introduction to Algorithms',
    author: "	Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    genre: "Textbook",
    description: "",
    image: "https://upload.wikimedia.org/wikipedia/en/f/ff/Clrs4.jpeg",
    usersId: 1,
  },
  {
    _id: 2,
    title: 'Multivariable Calculus',
    author: "James Stewart",
    genre: "Textbook",
    description: "",
    image: "https://www.cengage.com/covers/imageServlet?image_type=LRGFC&catalog=cengage&productISBN13=9780357042922",
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
  {
    _id: 4,
    title: 'Book4',
    author: "author4",
    genre: "genre4",
    description: "",
    image: "",
    usersId: 1,
  },
  {
    _id: 5,
    title: 'Book5',
    author: "author5",
    genre: "genre5",
    description: "",
    image: "",
    usersId: 1,
  },
  {
    _id: 6,
    title: 'Book6',
    author: "author6",
    genre: "genre6",
    description: "",
    image: "",
    usersId: 1,
  },
  {
    _id: 7,
    title: 'Book7',
    author: "author7",
    genre: "genre7",
    description: "",
    image: "",
    usersId: 1,
  },
  {
    _id: 8,
    title: 'Book8',
    author: "author8",
    genre: "genre8",
    description: "",
    image: "",
    usersId: 1,
  },
  {
    _id: 9,
    title: 'Book9',
    author: "author9",
    genre: "genre9",
    description: "",
    image: "",
    usersId: 1,
  },
  {
    _id: 10,
    title: 'Book10',
    author: "author10",
    genre: "genre10",
    description: "",
    image: "",
    usersId: 1,
  },
];

const BookCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#808080",
  padding: theme.spacing(1),
  borderRadius: 15,
  height: 160,
  width: 110,
}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 100,
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
  const [searchItem, setSearchItem] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(fakeBooks)

  const handleInputChange = (e: { target: { value: any; }; }) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = fakeBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBooks(filteredItems);
  }


  return (
  <Container
      maxWidth = {false}
      sx={{
        padding: 0,
      }}
      >
        <AppBar position="static" elevation={0}>
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
                    value={searchItem}
                    onChange={handleInputChange}
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
          padding: "20px",
        }}>
          <Grid container sx={{ flexGrow: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid container justifyContent="center" spacing={4}>
              {filteredBooks.map((book) => (
                <Grid key={book._id} item>
                  <BookCard sx={{ 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${book.image})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 155,
                  }}>
                  </BookCard>
                <Box sx={{
                  width: 110,
                }}>
                    <Typography fontWeight='bold'
                        style={{ wordWrap: "break-word" }}
                        component="div"
                        display="block"
                        color="#0c174b"
                  >{book.title}</Typography>
                  <Typography noWrap={true}
                        component="div"
                        display="block"
                        color="#0c174b">
                          {book.author}
                  </Typography>
                </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
}
