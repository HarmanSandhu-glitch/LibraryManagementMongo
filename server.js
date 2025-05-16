import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import authRouter from "./routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import renderRouter from "./routes/renderRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import { getAllBooks } from "./controllers/bookControllers.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to database
try {
  await dbConnect();
} catch (error) {
  console.error("Failed to start server due to database connection error:", error.message);
  process.exit(1);
}

app.set("views", path.join(__dirname, "Frontend"));
app.set("view engine", "ejs");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/render", renderRouter);
app.use("/book", bookRouter);
app.use("/student", studentRouter);
app.use("/auth", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('../Frontend/404/404');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
