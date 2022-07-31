const {executeAndLogQuery, appendSqlClause} = require('./queryService');

async function getAllShifts() {
    const queryString = 'SELECT * FROM shift';
    const tag = 'getAllShifts';
    return executeAndLogQuery(queryString, tag);
}

async function buildAndSendQuery(id, employee, date, start, end) {
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

    return executeAndLogQuery(queryString, tag);
}

module.exports = { 
    getAllShifts,
    buildAndSendQuery
};