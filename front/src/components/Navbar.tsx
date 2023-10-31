import { Dispatch, SetStateAction } from "react";
import AddIcon from "../icons/AddIcon";
import WrongIcon from "../icons/WrongIcon";

export default function Navbar({
  showAddForm,
  SetShowAddForm,
}: {
  showAddForm: boolean;
  SetShowAddForm: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed top-0 w-full flex justify-between items-center text-white p-5 bg-purple-500/50">
      BrewApps Books
      {!showAddForm ? (
        <div
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => SetShowAddForm(true)}
        >
          <span>Add Books</span> <AddIcon className="w-7 h-7" />
        </div>
      ) : (
        <div
          className="flex gap-2 justify-center items-center cursor-pointer"
          onClick={() => SetShowAddForm(false)}
        >
          <span>Exit Form</span> <WrongIcon className="w-7 h-7" />
        </div>
      )}
    </div>
  );
}
