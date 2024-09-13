const express = require("express");
const usersRouter = express.Router();
const DBConnectionPromise = require("../database.js");
const bcrypt = require("bcrypt");

// GET route to retrieve all users
usersRouter.get("/", async (req, res) => {
  try {
    const connection = await DBConnectionPromise; // Wait for the Promise to resolve
    connection.query("SELECT * FROM users", (err, results) => {
      if (err) {
        console.error("Error fetching vitals:", err);
        res.status(500).json({ error: "Error fetching patients" });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

// POST route to CREATE a new user
usersRouter.post("/", async (req, res) => {
  try {
    const connection = await DBConnectionPromise;

    const { username, password } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Hashed Password:", hashedPassword);
    console.log("Salt:", salt);

    const query = `
            INSERT INTO users (username, password, salt)
            VALUES (?, ?, ?)
          `;
    const values = [username, hashedPassword, salt];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Error saving users." });
      } else {
        res.status(201).json({
          message: "User saved successfully",
          user_id: results.insertId,
        });
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

// PUT route to UPDATE a user
usersRouter.put("/:id", async (req, res) => {
  try {
    const connection = await DBConnectionPromise;

    const userId = req.params.id;
    const { username } = req.body; // Get updated username from user inputted JSON object in Insomnia

    const query = `
        UPDATE users 
        SET username = ? 
        WHERE user_id = ?
      `;

    const values = [username, userId]; // Combine updated username and userId

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error updating patient:", err);
        res.status(500).json({ error: "Error updating user." });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json({ message: "User updated successfully" });
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

// DELETE route to DELETE a user
usersRouter.delete("/:id", async (req, res) => {
  try {
    const connection = await DBConnectionPromise;

    const userId = req.params.id;

    const query = `
          DELETE FROM users 
          WHERE user_id = ?
        `;

    connection.query(query, userId, (err, results) => {
      if (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Error deleting user." });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json({ message: "User deleted successfully" });
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

// POST route to Login a User
usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await DBConnectionPromise;

    // 1. Query the database to find the user
    const query = "SELECT * FROM users WHERE username = ?";
    connection.query(query, [username], async (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        // User not found
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0]; // Get the first (and only) user from the results

      // 2. Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // 3. Passwords match, create a session
        req.session.userId = user.user_id;
        res.json({ message: "Login successful" });
        console.log('req.session.userId ~>', req.session.userId);
        console.log('user.user_id ~>', user.user_id);
        console.log('Session created:', req.session);
      } else {
        // Passwords don't match
        res.status(401).json({ error: "Invalid username or password" });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/current", async (req, res) => {
  try {
    const connection = await DBConnectionPromise; 
    const userId = req.session.userId;

    console.log('JEPPY EXPECTS Session data in /current:', req.session);

    connection.query("SELECT * FROM users WHERE user_id = ?", [userId], (err, results) => {
      if (err) {
        console.error("Error fetching User:", err);
        res.status(500).json({ error: "Error fetching User." });
      } else {
        res.json(results);
        console.log('QUERY RESULTS:', results);
        console.log('User fetched:', req.session.userId); 
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});


module.exports = usersRouter;
