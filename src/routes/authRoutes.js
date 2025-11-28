import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 8);

  try {
    const insertUser = db.prepare(
      `INSERT INTO users(username , password) VALUES(? ,?)`
    );
    const result = insertUser.run(username, hashPassword);

    const todo = `Hello :): Add your first todo`;

    const insertTodos = db.prepare(
      `INSERT INTO todos(user_id , task) VALUES(?,?)`
    );

    insertTodos.run(result.lastInsertRowid, todo);
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(400).json({ error: "Username already taken" });
    }
    res.sendStatus(500);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.get(username);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Password not match" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });
    res.json({ token });
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
