const mysql = require("mysql");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Astral@07",
  database: "user_auth_db",
  port: "3308",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to MySQL Database");
});

// User Registration
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Registration Error:", err.message);
        return res.status(500).json({ message: "Registration failed" });
      }
      res.json({ message: " User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error hashing password" });
  }
});

// User Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Login Error:", err.message);
      return res.status(500).json({ message: "Login failed" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    // Verify password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Password Verification Error:", err.message);
        return res.status(500).json({ message: "Login error" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1h" }
      );

      res.json({ message: "✅ Login successful", token, user });
    });
  });
});

// Fetch All Users
app.get("/users", (req, res) => {
  const sql = "SELECT id, name, email FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch users" });
    res.json(results);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
