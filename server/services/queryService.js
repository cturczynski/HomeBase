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

async function executeAndLogQuery(queryString, params, tag) {
    console.log(`Querying database with tag ${tag} and query: `, queryString);
    const rows = await db.query(queryString, params);
    const data = emptyOrRows(rows);

    console.log(`Database returned data for query tag ${tag}: `, data);
    return data;
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

async function getColumnNames(tableName) {
    let sql = `SHOW columns from ${tableName}`;
    let tag = "getColumnNames";
    const columnObjects = await executeAndLogQuery(sql, null, tag);
    if (columnObjects.error !== undefined) {
        return columnObjects;
    } else {
        return columnObjects.map(col => {return col.Field;});
    }
}

async function sanitizeDbObject(obj, tableName) {
    let columnNames = await getColumnNames(tableName);
    console.log(`Retrieved column names for table ${tableName}: ${columnNames}`);
    if (columnNames.length === 0 || columnNames.error !== undefined) {
        return {"error" : `Could not sanitize update object. ${getValueOrNull(columnNames.error)}`}
    } else {
        Object.keys(obj).forEach(key => {
            if (!columnNames.includes(key)) {
                delete obj.key;
            }
        });
        return obj;
    }
}

function cleanUpdateResult(updateResult) {
    if (updateResult === undefined || updateResult.error !== undefined) {
        return updateResult;
    } else {
        return {"updateResult" : Object.assign({}, updateResult)};
    }
}

module.exports = { 
    getOffset, 
    emptyOrRows,
    executeAndLogQuery,
    getValueOrNull,
    appendSqlClause,
    getColumnNames,
    sanitizeDbObject,
    cleanUpdateResult
};