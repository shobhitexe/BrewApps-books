import { useEffect, useState, ChangeEvent, Fragment } from "react";
import { deleteBook, fetchBooks, updateBookdata } from "../api/booksApi";
import { BookType } from "../types/BooksType";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import TickIcon from "../icons/TickIcon";
import { motion, AnimatePresence } from "framer-motion";

const inputs = ["Title", "Author", "Summary"];

export default function BooksDisplay() {
  const [books, setBooks] = useState<BookType[]>([]);

  const [showDeleteIcon, setShowDeleteIcon] = useState<number>(-1);
  const [showEditInputs, setShowEditInputs] = useState<number>(-1);
  const [isEditModeOn, SetIsEditModeOn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const fetchedBooks: BookType[] = await fetchBooks();
      setBooks(fetchedBooks);
    })();
  }, []);

  function handleDataChange(
    id: string,
    fieldName: keyof BookType,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const updatedValue = event.target.value;

    const newBooksArr = books.map((book) => {
      if (book._id !== id) return book;
      return { ...book, [fieldName]: updatedValue };
    });

    setBooks(newBooksArr);
  }

  return (
    <div className="mt-[100px] flex w-full gap-5 mx-auto flex-wrap text-white px-5 max-md:justify-center">
      <AnimatePresence>
        {books.map((book, idx) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={book._id}
            className="bg-purple-400/20 pdx-10 py-5 text-left rounded-md cursor-pointer shadow-lg flex flex-col gap-2 relative"
            onMouseEnter={() => setShowDeleteIcon(idx)}
            onMouseLeave={() => {
              setShowDeleteIcon(-1);
            }}
          >
            {idx === showDeleteIcon && (
              <>
                <DeleteIcon
                  className="w-8 h-8 bg-red-700 p-1 rounded-md absolute right-2 top-2 hover:bg-gray-400 duration-500"
                  onClick={async () => {
                    const response = await deleteBook(book._id);
                    if (response !== true) return;
                    const newArr = books.filter(
                      (item) => item._id !== book._id
                    );
                    setBooks(newArr);
                  }}
                />
                {!isEditModeOn ? (
                  <EditIcon
                    className="w-8 h-8 bg-blue-500 p-1 rounded-md absolute right-12 top-2 hover:bg-gray-400 duration-500"
                    onClick={() => {
                      setShowEditInputs(idx);
                      SetIsEditModeOn(true);
                    }}
                  />
                ) : (
                  idx === showEditInputs && (
                    <TickIcon
                      className="w-8 h-8 bg-blue-500 p-1 rounded-md absolute right-12 top-2 hover:bg-gray-400 duration-500"
                      onClick={() => {
                        setShowEditInputs(-1);
                        SetIsEditModeOn(false);
                        updateBookdata(book._id, {
                          title: book.title,
                          author: book.author,
                          summary: book.summary,
                        });
                      }}
                    />
                  )
                )}
              </>
            )}

            {inputs.map((input) => (
              <Fragment key={input}>
                <div className="px-10">
                  <span>{input} :- </span>
                  {showEditInputs === idx ? (
                    <input
                      value={book[input.toLowerCase() as keyof BookType]}
                      className="outline-none bg-transparent border-b"
                      onChange={(event) =>
                        handleDataChange(
                          book._id,
                          input.toLowerCase() as keyof BookType,
                          event
                        )
                      }
                    />
                  ) : (
                    <span>{book[input.toLowerCase() as keyof BookType]}</span>
                  )}
                </div>{" "}
                <hr className="opacity-50" />
              </Fragment>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
