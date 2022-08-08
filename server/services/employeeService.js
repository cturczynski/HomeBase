const {executeAndLogQuery, appendSqlClause} = require('./queryService');
const db = require('./db');

async function getAllEmployees() {
    const queryString = 'SELECT * FROM employee';
    const tag = 'getAllEmployees';
    return executeAndLogQuery(queryString, null, tag);
}

async function buildAndSendSelectQuery(id, username) {
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

    return executeAndLogQuery(queryString, null, tag);
}

async function buildAndSendUpdateQuery(employee) {
    let id = employee.id;
    delete employee.id;
    var params = [employee, id];
    let sql = "UPDATE employee SET ? WHERE id=?";
    let tag = "updateEmployee";

    return executeAndLogQuery(sql, params, tag);
}

async function buildAndSendInsertQuery(employee) {
    delete employee.id;
    let sql = "INSERT into employee SET ?";
    let tag = "insertEmployee";

    return executeAndLogQuery(sql, employee, tag);
}

module.exports = { 
    getAllEmployees,
    buildAndSendSelectQuery,
    buildAndSendUpdateQuery,
    buildAndSendInsertQuery
};