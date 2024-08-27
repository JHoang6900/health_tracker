const express = require("express");
const usersRouter = express.Router();
const DBConnectionPromise = require("../database.js");

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

    const { username, password, salt } = req.body;

    const query = `
            INSERT INTO users (username, password, salt)
            VALUES (?, ?, ?)
          `;
    const values = [username, password, salt];

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

module.exports = usersRouter;
