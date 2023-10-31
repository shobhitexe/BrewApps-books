import { Request, Response } from "express";
import { bookModel } from "../models/bookModel";

export const addBook = async (req: Request, res: Response) => {
  const { title, author, summary } = req.body;

  if (!title || !author || !summary) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: title, author, and summary.",
    });
  }

  try {
    const newBook = new bookModel({ title, author, summary });
    const savedBook = await newBook.save();

    return res.status(200).json({
      success: true,
      message: "Book added successfully.",
      book: savedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save the book.",
      error: error,
    });
  }
};

export const viewAll = async (req: Request, res: Response) => {
  try {
    const allBooks = await bookModel.find({});
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully.",
      books: allBooks,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch books.",
      error: error,
    });
  }
};

export const fetchDetailsOfOneBook = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "id required.",
    });
  }
  try {
    const bookDetails = await bookModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "Book details fetched successfully.",
      book: bookDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch book details.",
      error: error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id, title, author, summary } = req.body;

  if (!id || !title || !author || !summary) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: title, author, and summary.",
    });
  }

  try {
    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      {
        $set: { title, author, summary },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Book details updated successfully.",
      updatedBook: updatedBook,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update book details.",
      error: error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "id required.",
    });
  }

  try {
    const booksArray = await bookModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "deleted book successfully.",
      newArray: booksArray,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error: error,
    });
  }
};
