const express = require("express");
const mysql = require("mysql2");
const DBConnection = require("../database.js");
const router = express.Router();
const DBConnectionPromise = require("../database.js");

// GET route to retrieve all vitals
router.get("/", async (req, res) => {
  try {
    const connection = await DBConnectionPromise; // Wait for the Promise to resolve
    connection.query("SELECT * FROM vitals", (err, results) => {
      if (err) {
        console.error("Error fetching vitals:", err);
        res.status(500).json({ error: "Error fetching vitals" });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

// POST route to create a new vital entry
router.post("/", async (req, res) => {
  // Mark the handler as async
  try {
    const connection = await DBConnectionPromise;

    const {
      patient_id,
      user_id,
      datetime,
      blood_pressure,
      pulse,
      oxygen,
      temperature,
      respiration,
    } = req.body;

    const query = `
        INSERT INTO vitals (patient_id, user_id, datetime, blood_pressure, pulse, oxygen, temperature, respiration) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const values = [
      patient_id,
      user_id,
      datetime,
      blood_pressure,
      pulse,
      oxygen,
      temperature,
      respiration,
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting vitals:", err);
        res.status(500).json({ error: "Error saving vitals" });
      } else {
        res.status(201).json({
          message: "Vitals saved successfully",
          vital_id: results.insertId,
        });
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

// PUT route to update a vital entry
router.put("/:id", (req, res) => {
  // Need to specify the vital ID in the URL
  // ... your logic to update a vital entry (SQL query using DBConnection)
  res.send("Update a vital entry"); // Replace with actual data update and response
});

// DELETE route to delete a vital entry
router.delete("/:id", (req, res) => {
  // Need to specify the vital ID in the URL
  // ... your logic to delete a vital entry (SQL query using DBConnection)
  res.send("Delete a vital entry"); // Replace with actual data deletion and response
});

module.exports = router;
