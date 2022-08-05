const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
    try {
        const connection = await mysql.createConnection(config.db);
        const [results, ] = await connection.query(sql, params);

        return results;
    } catch (err) {
        return {"error": `Database query unsuccessful. ${err}`};
    }
}

module.exports = {
    query
};