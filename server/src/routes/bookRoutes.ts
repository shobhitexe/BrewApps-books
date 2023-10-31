import express from "express";
import {
  addBook,
  deleteBook,
  fetchDetailsOfOneBook,
  updateBook,
  viewAll,
} from "../controllers/bookControllers";

const router = express.Router();

router.post("/add", addBook);
router.get("/viewall", viewAll);
router.get("/fetchdetails", fetchDetailsOfOneBook);
router.post("/update", updateBook);
router.get("/delete", deleteBook);

export default {
  routes: router,
};
