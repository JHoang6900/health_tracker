const express = require("express");
const patientsRouter = express.Router();
const DBConnectionPromise = require("../database.js");

// GET route to retrieve all patients
patientsRouter.get("/", async (req, res) => {
  try {
    const connection = await DBConnectionPromise; // Wait for the Promise to resolve
    connection.query("SELECT * FROM patients", (err, results) => {
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

// POST route to create a new patient
patientsRouter.post("/", async (req, res) => {
  try {
    const connection = await DBConnectionPromise;

    const { name } = req.body;

    const query = `
          INSERT INTO patients (name) 
          VALUES (?)
        `;
    const values = [name];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting patients:", err);
        res.status(500).json({ error: "Error saving patients" });
      } else {
        res.status(201).json({
          message: "Patients saved successfully",
          patient_id: results.insertId,
        });
      }
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

// PUT route to UPDATE a patient
patientsRouter.put('/:id', async (req, res) => {
    try {
      const connection = await DBConnectionPromise; 
  
      const patientId = req.params.id;
      const updatedData = req.body; // Get all updated data from the request body
  
      // Dynamically build the SET clause
      const setClause = Object.keys(updatedData)
        .map(key => `${key} = ?`)
        .join(', ');
  
      const query = `
        UPDATE patients 
        SET ${setClause} 
        WHERE patient_id = ?
      `;
  
      const values = [...Object.values(updatedData), patientId]; // Combine updated values and vitalId
  
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error("Error updating patient:", err);
          res.status(500).json({ error: "Error updating patient." });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Patient not found' });
        } else {
          res.json({ message: 'Patient updated successfully' });
        }
      });
    } catch (err) {
      console.error("Database connection error:", err);
      res.status(500).json({ error: "Database connection error" });
    }
  });


  // DELETE route to delete a patient
patientsRouter.delete("/:id", async (req, res) => {
    try {
      const connection = await DBConnectionPromise;
  
      const patientId = req.params.id; // Get vital_id from URL parameters
  
      const query = `
        DELETE FROM patients 
        WHERE patient_id = ?
      `;
      const values = [patientId];
  
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error("Error deleting patient:", err);
          res.status(500).json({ error: "Error deleting patient" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Patient not found' });
        } else {
          res.json({ message: 'Patient deleted successfully' });
        }
      });
    } catch (err) {
      console.error("Database connection error:", err);
      res.status(500).json({ error: "Database connection error" });
    }
  });

module.exports = patientsRouter;
