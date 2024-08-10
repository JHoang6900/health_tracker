const mysql = require('mysql2');
const dotenv = require('dotenv'); // Load environment variables

dotenv.config(); // Load environment variables from .env file

console.log('DB_HOST:', process.env.DB_HOST); // debugging line

const DBConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

DBConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to health_tracker_db.');
});
