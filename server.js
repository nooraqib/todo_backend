import dotenv from "dotenv";
import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import todoRoutes from "./src/routes/todosRoutes.js";
import authMiddleware from "./src/middleware/authMiddleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todo", authMiddleware, todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening on updated port ${port}`);
});
