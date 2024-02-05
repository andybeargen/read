import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type BookMutation = {
    id?: string;
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    image?: string;
    sections?: string[]; // book section ids
  };

  export type BookRecord = BookMutation & {
    id: string;
    createdAt: String;
  }

  const fakeBooks = {
    records: {} as Record<string, BookRecord>,

    async getAll(): Promise<BookRecord[]> {
        return Object.keys(fakeBooks.records)
        .map((key) => fakeBooks.records[key])
        .sort(sortBy("-createdAt", "last")); // sort by last created
    },

    async get(id: string): Promise<BookRecord | null> {
        return fakeBooks.records[id] || null;
    },

    async create(values: BookMutation): Promise<BookRecord> {
        const id = values.id || Math.random().toString(36).substring(2, 9);
        const createdAt = new Date().toISOString();
        const newBook = { id, createdAt, ...values };
        fakeBooks.records[id] = newBook;
        return newBook;
    },

    async set(id: string, values: BookMutation): Promise<BookRecord> {
        const book = await fakeBooks.get(id);
        invariant(book, `No book found for ${id}`);
        const updatedBook = { ...book, ...values };
        fakeBooks.records[id] = updatedBook;
        return updatedBook;
    },

    destroy(id: string): null {
        delete fakeBooks.records[id];
        return null;
      },
};

// Helper functions to be called from route loaders and actions
export async function getBooks(query?: string | null) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let books = await fakeBooks.getAll();
    if (query) {
      books = matchSorter(books, query, {
        keys: ["title", "author"],
      });
    }
    return books.sort(sortBy("title", "createdAt"));
}

export async function createEmptyBook() {
    const book = await fakeBooks.create({});
    return book;
}

export async function getBook(id: string) {
    return fakeBooks.get(id);
}

export async function updateBook(id: string, updates: BookMutation) {
    const book = await fakeBooks.get(id);
    if (!book) {
      throw new Error(`No contact found for ${id}`);
    }
    await fakeBooks.set(id, { ...book, ...updates });
    return book;
}

export async function deleteBook(id: string) {
    fakeBooks.destroy(id);
}

[
    {
        title: "Frankenstein",
        author: "Mary Shelley",
        genre: "Science Fiction",
        image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982146160/frankenstein-9781982146160_xlg.jpg",
    },
    {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen", // multiple authors?
        genre: "Textbook",
        image: "https://upload.wikimedia.org/wikipedia/en/f/ff/Clrs4.jpeg",
    },
].forEach((book) => {
    fakeBooks.create({
      ...book,
      id: `${book.title.toLowerCase()}-${book.author.toLocaleLowerCase()}`,
    });
  });