import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import authRouter from "./routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import renderRouter from "./routes/renderRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import { getAllBooks } from "./controllers/bookControllers.js";
dotenv.config();

await dbConnect();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Frontend"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Library Management System!");
});

app.use("/auth", authRouter);
app.use("/render", renderRouter);
app.use("/book",bookRouter);
app.get("/adminDashboard", async (req, res) => {
  const {success, data: books} = await getAllBooks();
  if(!success) {
    return res.status(500).json({success, message: "Error fetching books"});
  }
  res.render("../Frontend/Dashboards/adminDashboard", {books, students: []});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
