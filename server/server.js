const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const DBConnection = require('./database.js');
const vitalsRouter = require('./routes/vitals');
const patientsRouter = require('./routes/patients.js')
const usersRouter = require('./routes/users.js')
const session = require('express-session');


const app = express();

app.use(session({
  secret: 'superdupersecret', 
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 604800  // Nested within the 'cookie' object
  }
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,  // Allows for cookies to be sent across domains
}));
app.use(express.json()); // This line is important for parsing JSON data in requests
// ... Your API routes will go here, and they'll use the DBConnection object to interact with the database

app.use('/vitals', vitalsRouter); 
app.use('/patients', patientsRouter );
app.use('/users', usersRouter);


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})




app.listen(8080, () => {
    console.log('Server is listening on port 8080.');
})


