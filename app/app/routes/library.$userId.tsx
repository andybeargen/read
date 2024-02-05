import * as React from 'react';
import type { LinksFunction } from "@remix-run/node";
import {   
    Form,
    Link,
    LiveReload,
    Outlet,
    Meta,
    Links,
    Scripts,
    useLoaderData,
    ScrollRestoration, } from '@remix-run/react';
import { Button,
    Typography,
    IconButton,
    TextField,
} from '@mui/material';
import { json } from "@remix-run/node";
import { NoEncryption } from '@mui/icons-material';

import { getBooks } from "../models/book.server";

export const loader = async () => {
    const books = await getBooks();
    return json({ books });
  };


export default function Library() {
  const { books } = useLoaderData();

  return (
    <React.Fragment>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <div id="sidebar">
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                Library
            </Typography>
            <Button variant="contained" component={Link} to="/BookUploadBook">
                Upload a book
            </Button>
            <div
            style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: 20
            }}
            >
            <form>
            <TextField
                id="search-bar"
                className="text"
                label="Search for a book"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />
                <IconButton type="submit" aria-label="search">
            </IconButton>
            </form>
            </div>

            <nav>
            {books.length ? (
                <ul>
                    {books.map((book) => (
                    <li className="text"
                    style={{
                    padding: 5,
                    justifyContent: "normal",
                    fontSize: 18,
                    color: "blue",
                    margin: 1,
                    width: "250px",
                    borderWidth: "10px",
                    textDecoration: "none",
                    listStyleType: "none",
                    fontFamily: "sans-serif"
                    }}
                    key={book.id} >
                        <Link to={`${book.id}` }  style={{ textDecoration: 'none' }}
                        >
                        {book.title || book.author ? (
                            <>
                            {book.title} by {book.author}
                            </>
                        ) : (
                            <i>No title</i>
                        )}{" "}
                        </Link>
                    </li>
                    ))}
                </ul>
                ) : (
                <p>
                    <i>No books</i>
                </p>
                )}
            </nav>

            <div
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                {books.length ? (
                <table>
                    <tbody>
                        <tr style={{
                            padding: "15px"
                        }} >
                        {books.map((book) => (
                        <th style={{
                            padding: "15px"
                        }} className="covers"
                        key={book.id} >
                            <div>
                                {/* <img 
                                alt={`${book.title} by ${book.author} avatar`}
                                key={book.image}
                                src={book.image}
                                width="200" 
                                height="250"
                                /> */}
                            </div>
                        </th>
                    ))}
                        </tr>
                    </tbody>
                    
                </table>
                ) : (
                <p>
                    <i>No books</i>
                </p>
                )}
            </div>
        </div>
    </React.Fragment>
    
  );
}
