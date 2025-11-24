import Database from "better-sqlite3";

// Create or open SQLite DB file
const db = new Database("database.sqlite");

db.pragma("foreign_keys = ON");
// Create tables
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        completed BOOLEAN DEFAULT 0,
        task TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`);

export default db;
