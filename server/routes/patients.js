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


// POST route to create a new vital entry
patientsRouter.post("/", async (req, res) => {
    try {
      const connection = await DBConnectionPromise;
  
      const {
        name
      } = req.body;
  
      const query = `
          INSERT INTO patients (name) 
          VALUES (?)
        `;
      const values = [
        name
      ];
  
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
  


  module.exports = patientsRouter;