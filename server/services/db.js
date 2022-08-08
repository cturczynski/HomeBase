const mysql = require('mysql2/promise');
const config = require('../config');

var connection = mysql.createPool(config.db);

async function query(sql, params) {
    try {
        const [results, ] = await connection.query(sql, params);

        return results;
    } catch (err) {
        return {"error": `Database query unsuccessful. ${err}`};
    }
}

// Attempt to catch disconnects 
connection.on('connection', function (connection) {
    console.log('DB Connection established');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
  
});

module.exports = {
    query
};