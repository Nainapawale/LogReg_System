const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Astral@07",
  database: "user_auth_db",
  port: "3308",
});

db.connect((err) => {
  if (err) {
    console.error("Database Connection failed: ", err.message);
    return;
  }
  console.log("Connected to MySQL Database");
});

module.exports = db;
