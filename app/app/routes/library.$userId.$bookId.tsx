import { Form } from "@remix-run/react";
import type { FunctionComponent } from "react";

// import type { Book } from "../data";

export default function Book() {
    const book = {
        title: "book title",
        author: "book author",
        genre: "genre",
        description: "des",
        image: "https://upload.wikimedia.org/wikipedia/en/f/ff/Clrs4.jpeg",
    };

    return (
<div id="book">
      <div>
        <img
          alt={`${book.title} by ${book.author} avatar`}
          key={book.image}
          src={book.image}
        />
      </div>

      <div>
        <h1>
          {book.title || book.author ? (
            <>
              {book.title} {book.author}
            </>
          ) : (
            <i>No Title</i>
          )}{" "}
        </h1>

        {book.description ? <p>{book.description}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this book."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
    );
};