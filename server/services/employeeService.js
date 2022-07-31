const {executeAndLogQuery, appendSqlClause} = require('./queryService');

async function getAllEmployees() {
    const queryString = 'SELECT * FROM employee';
    const tag = 'getAllEmployees';
    return executeAndLogQuery(queryString, tag);
}

async function buildAndSendQuery(id, username) {
    var queryString = `SELECT * FROM employee`;
    var tag = 'getEmployees';

    if (id !== null) {
        queryString = appendSqlClause(queryString, ` id = ${id}`);
        tag = tag.concat('ById');
    }

    if (username !== null) {
        queryString = appendSqlClause(queryString, ` username = "${username}"`);
        tag = tag.concat('ByUsername');
    }

    return executeAndLogQuery(queryString, tag);
}

module.exports = { 
    getAllEmployees,
    buildAndSendQuery
};