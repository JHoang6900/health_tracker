const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const DBConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Export a Promise that resolves when the connection is established
module.exports = new Promise((resolve, reject) => {
    DBConnection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            reject(err); // Reject the Promise if there's an error
        } else {
            console.log('Connected to health_tracker_db.');
            resolve(DBConnection); // Resolve the Promise with the connection object
        }
    });
});
