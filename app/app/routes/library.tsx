import * as React from "react";
import { useState } from "react";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import {
  Button,
  Typography,
  Box,
  Container,
  InputBase,
  AppBar,
  styled,
  Grid,
  Paper,
  Modal,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { CloudUpload } from "@mui/icons-material";

import { getSession, commitSession } from "../sessions";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createBook, getUserLibrary } from "~/models/book.server";
import { parseEpub } from "~/utils/epub";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  let userId;

  if (session.has("userId")) {
    userId = session.get("userId");
  } else {
    return redirect("/login");
  }

  let body = await request.formData();
  let epubFile = body.get("file") as File;

  if (epubFile) {
    let epubInfo = await parseEpub(epubFile);
    let bookData = {...epubInfo, user: {connect: {id: userId as string}}};
    let book = await createBook(bookData);
  }

  return {};
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  let userId;

  // check if correct user
  if (session.has("userId")) {
    userId = session.get("userId");
  } else {
    return redirect("/login");
  }

  // get books
  let books: any = userId != undefined ? await getUserLibrary(userId) : [];
  books.forEach((book: any) => {
      if (book.image) {
        book.image = "data:image/jpeg;base64," + book.image.toString('base64');
      } else {
        book.image = "";
      }
  })

  return json(
    { books },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

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

export default function Library() {
  const { books } = useLoaderData<typeof loader>();
  const [searchItem, setSearchItem] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = useSubmit();

  const handleInputChange = (e: { target: { value: any } }) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredBooks(filteredItems);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        padding: 0,
      }}
    >
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
              fontWeight="bold"
              style={{ wordWrap: "break-word" }}
              component="div"
              display="block"
              color="#0c174b"
              padding="30px 0px 0px 0px"
            >
              Library
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "15px 30px 15px 30px",
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

      <Box
        sx={{
          padding: "10px",
          alignItems: "right",
        }}
      >
      {/*
        <Button
          sx={{
            borderRadius: 10,
            bgcolor: "#0c174b",
            color: "#fff",
          }}
          variant="contained"
          onClick={handleOpen}
        >
          Upload a book
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              height: '50%',
              aspectRatio: '1/1',
              boxShadow: 24,
              p: 4,
              zIndex: 999999}}>
              <Form action={"/library/"} method="post" encType="multipart/form-data">
                <TextField name="file" type="file"></TextField>
                <Button type="submit">
                  Upload
                </Button>
              </Form>
          </Box>
        </Modal>
        */}

        <Form onChange={(event) => {
          submit(event.currentTarget)
          }} 
          action="/library" method="post" encType="multipart/form-data">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Upload Book
            <VisuallyHiddenInput name="file" type="file" accept=".epub"/>
          </Button>
        </Form>
      </Box>
        
      <Box
        sx={{
          flexGrow: 1,
          padding: "20px",
        }}
      >
        <Grid
          container
          sx={{ flexGrow: 1 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid container justifyContent="center" spacing={4}>
            {filteredBooks.map((book) => (
              <Grid key={book.id} item>
                <BookCard
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${book.image})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 155,
                  }}
                ></BookCard>
                <Box
                  sx={{
                    width: 110,
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    style={{ wordWrap: "break-word" }}
                    component="div"
                    display="block"
                    color="#0c174b"
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    noWrap={true}
                    component="div"
                    display="block"
                    color="#0c174b"
                  >
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
