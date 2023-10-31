import { ChangeEvent, FormEvent, useState } from "react";
import { formType } from "../types/BooksType";
import { addBook } from "../api/booksApi";
import { motion, AnimatePresence } from "framer-motion";

const inputs = ["Title", "Author", "Summary"];

export default function AddForm() {
  const [formData, setFormData] = useState<formType>({
    title: "",
    author: "",
    summary: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<{
    state: boolean;
    message: string;
  }>({
    state: false,
    message: "",
  });

  function handelingInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function formSubmithandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await addBook(formData);
    if (response) {
      setIsSubmitted({ state: true, message: "New Book Added" });
      window.location.reload();
    } else {
      setIsSubmitted({ state: true, message: "Failed to add new book" });
    }
  }

  return (
    <div className="fixed text-white md:w-[70%] sm:w-[80%] w-[90%] h-[70%] bg-purple-500 rounded-lg shadow-xl py-10 -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%]">
      <h1 className="text-[20px] text-center">Add New Book</h1>
      <AnimatePresence>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col w-[70%] gap-5 mt-5 mx-auto"
          method="POST"
          onSubmit={formSubmithandler}
        >
          {inputs.map((input) => (
            <input
              key={input}
              type="text"
              name={input.toLowerCase()}
              placeholder={input}
              value={formData[input.toLowerCase() as keyof formType]}
              className="bg-transparent border-b placeholder-white focus:outline-none caret-black"
              onChange={handelingInput}
              required
            />
          ))}
          <input
            type="submit"
            className="mt-5 bg-green-500 w-fit mx-auto px-10 py-3 rounded-xl shadow-sm cursor-pointer hover:bg-slate-400 duration-500"
            required
          />
        </motion.form>
      </AnimatePresence>

      {isSubmitted.state && (
        <h1 className="mt-5 text-center">{isSubmitted.message}</h1>
      )}
    </div>
  );
}
