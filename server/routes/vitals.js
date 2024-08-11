const express = require("express");
const vitalsRouter = express.Router();
const DBConnectionPromise = require("../database.js");

// GET route to retrieve all vitals
vitalsRouter.get("/", async (req, res) => {
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
vitalsRouter.post("/", async (req, res) => {
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

vitalsRouter.put('/:id', async (req, res) => {
  try {
    const connection = await DBConnectionPromise; 

    const vitalId = req.params.id;
    const updatedData = req.body; // Get all updated data from the request body

    // Dynamically build the SET clause
    const setClause = Object.keys(updatedData)
      .map(key => `${key} = ?`)
      .join(', ');

    const query = `
      UPDATE vitals 
      SET ${setClause} 
      WHERE vital_id = ?
    `;

    const values = [...Object.values(updatedData), vitalId]; // Combine updated values and vitalId

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error updating vitals:", err);
        res.status(500).json({ error: "Error updating vitals" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Vital not found' });
      } else {
        res.json({ message: 'Vital updated successfully' });
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});


// DELETE route to delete a vital entry
vitalsRouter.delete("/:id", async (req, res) => {
  try {
    const connection = await DBConnectionPromise;

    const vitalId = req.params.id; // Get vital_id from URL parameters

    const query = `
      DELETE FROM vitals 
      WHERE vital_id = ?
    `;
    const values = [vitalId];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error deleting vitals:", err);
        res.status(500).json({ error: "Error deleting vitals" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Vital not found' });
      } else {
        res.json({ message: 'Vital deleted successfully' });
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});


module.exports = vitalsRouter;
