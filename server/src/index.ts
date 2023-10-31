import { connectToDB } from "./database";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", bookRoutes.routes);

connectToDB().then(() => {
  app.listen(port, async () => {
    console.log("Server up and running on port :- " + port);
  });
});
