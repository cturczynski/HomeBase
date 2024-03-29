const {executeAndLogQuery, appendSqlClause} = require('./queryService');
const db = require('./db');

async function getAllShifts() {
    const queryString = 'SELECT * FROM shift';
    const tag = 'getAllShifts';
    return executeAndLogQuery(queryString, null, tag);
}

async function buildAndSendSelectQuery(id, employee, date, start, end) {
    var queryString = `SELECT * FROM shift`;
    var tag = 'getShifts';

    if (id !== null) {
        queryString = appendSqlClause(queryString, ` id = ${id}`);
        tag = tag.concat('ById');
    }

    if (employee !== null) {
        queryString = appendSqlClause(queryString, ` employee_id = ${employee}`);
        tag = tag.concat('ByEmployeeId');
    }

    if (date !== null) {
        queryString = appendSqlClause(queryString, ` date = ${date}`);
        tag = tag.concat('ByDate');
    }

    if (start !== null) {
        queryString = appendSqlClause(queryString, ` date >= ${start}`);
        tag = tag.concat('ByStartRange');
    }

    if (end !== null) {
        queryString = appendSqlClause(queryString, ` date <= ${end}`);
        tag = tag.concat('ByEndRange');
    }

    return executeAndLogQuery(queryString, null, tag);
}

async function buildAndSendUpdateQuery(shift) {
    var shiftClone = Object.assign({}, shift);
    let id = shiftClone.id;
    delete shiftClone.id;
    var params = [shiftClone, id];
    let sql = "UPDATE shift SET ? WHERE id=?";
    let tag = "updateShift";

    return executeAndLogQuery(sql, params, tag);
}

async function buildAndSendInsertQuery(shift) {
    var shiftClone = Object.assign({}, shift);
    delete shiftClone.id;
    let sql = "INSERT into shift SET ?";
    let tag = "insertShift";

    return executeAndLogQuery(sql, shiftClone, tag);
}

module.exports = { 
    getAllShifts,
    buildAndSendSelectQuery,
    buildAndSendUpdateQuery,
    buildAndSendInsertQuery
};