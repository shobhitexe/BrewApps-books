import { formType } from "../types/BooksType";

const url = import.meta.env.VITE_URL;

console.log(url);

export async function fetchBooks() {
  try {
    const response = await fetch(`${url}/api/viewall`, {
      method: "GET",
    });

    if (response.status !== 200) throw new Error("Failed to fetch books");

    const { books } = await response.json();

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export async function deleteBook(id: string) {
  try {
    const response = await fetch(`${url}/api/delete?id=${id}`, {
      method: "GET",
    });
    if (response.status !== 200) throw new Error("Failed to delete");

    return true;
  } catch (error) {
    console.error("Error deleting", error);
  }
}

export async function addBook(data: formType) {
  try {
    const response = await fetch(`${url}/api/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) throw new Error("Failed to add book");

    return true;
  } catch (error) {
    console.error("Error adding new book data", error);
  }
}

export async function updateBookdata(id: string, data: formType) {
  console.log({ id, ...data });
  try {
    const response = await fetch(`${url}/api/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...data }),
    });

    console.log(response);
  } catch (error) {
    console.error("Error updaing data", error);
  }
}
