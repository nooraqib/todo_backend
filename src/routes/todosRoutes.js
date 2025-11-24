import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  const todos = getTodos.all(req.userid);
  console.log(req.userid, "todos----");
  res.json(todos);
});

router.post("/", (req, res) => {
  console.log("is it run ");
  const { task } = req.body;
  const insertTodo = db.prepare(
    `INSERT INTO todos (user_id, task) VALUES(?, ?)`
  );
  try {
    insertTodo.run(req.userid, task);
    res.json({ id: insertTodo.lastID, task, completed: 0 });
  } catch (err) {
    res.status(400).json({ message: "some thing went wrong" });
    console.log(err, "error on post request");
  }
});

router.put("/:id", (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  try {
    const updatedQuery = db.prepare(
      `UPDATE todos SET completed = ? WHERE id = ?`
    );
    updatedQuery.run(completed, id);
    res.json({ message: "completed" });
  } catch (err) {
    console.log(err, "err");
  }
});

router.delete("/:id", (req, res) => {});

export default router;
