const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const DBConnection = require('./database.js');
const vitalsRouter = require('./routes/vitals');
const patientsRouter = require('./routes/patients.js')
const usersRouter = require('./routes/users.js')



const app = express();

app.use(express.json()); // This line is important for parsing JSON data in requests
// ... Your API routes will go here, and they'll use the DBConnection object to interact with the database

app.use('/vitals', vitalsRouter); 
app.use('/patients', patientsRouter );
app.use('/users', usersRouter);


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})


app.use(cors());

app.listen(8080, () => {
    console.log('Server is listening on port 8080.');
})


