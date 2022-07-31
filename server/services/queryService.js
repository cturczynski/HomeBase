const db = require('./db');

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
};

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
};

async function executeAndLogQuery(queryString, tag) {
    console.log(`Querying database with tag ${tag} and query: `, queryString);
    const rows = await db.query(queryString);
    const data = emptyOrRows(rows);

    console.log(`Database returned data for query tag ${tag}: `, data);
    return rows;
}

function getValueOrNull(value) {
    if (value === undefined) {
        return null;
    } else {
        return value
    }
}

function appendSqlClause(queryString, clause) {
    var newQueryString = queryString;

    if (newQueryString.includes('WHERE')) {
        newQueryString = newQueryString.concat(` AND`);
    } else {
        newQueryString = newQueryString.concat(` WHERE`);
    }
    newQueryString = newQueryString.concat(clause);

    return newQueryString;
}

module.exports = { 
    getOffset, 
    emptyOrRows,
    executeAndLogQuery,
    getValueOrNull,
    appendSqlClause
};