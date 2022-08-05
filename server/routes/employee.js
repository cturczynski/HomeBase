const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');
const { getValueOrNull, sanitizeUpdateObject, cleanUpdateResult } = require('../services/queryService');

router.get('/', async function(req, res, next) {
    const id = getValueOrNull(req.query.id);
    const username = getValueOrNull(req.query.username);

    try {
        let employees = await employeeService.buildAndSendSelectQuery(id, username);
        let responseJson = cleanEmployeeObjects(employees);
        res.json(responseJson);
    } catch (err) {
        console.error('Error while getting employees ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
})

router.get('/all', async function(req, res, next) {
    try {
        var employees = await employeeService.getAllEmployees();
        let responseJson = cleanEmployeeObjects(employees);
        res.json(responseJson);
    } catch (err) {
        console.error('Error while getting all employees ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
});

router.post('/', async function(req, res, next) {
    console.log(req.body);
    try {
        let cleanedBody = await sanitizeUpdateObject(req.body, "employee");
        if (cleanedBody.error !== undefined) {
            res.json(cleanedBody);
        } else {
            let updateResult = await employeeService.buildAndSendUpdateQuery(cleanedBody);
            let jsonResponse = cleanUpdateResult(updateResult);
            res.json(jsonResponse);
        }
    } catch (err) {
        console.error('Error while updating employee ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
});

function cleanEmployeeObjects(employees) {
    if (employees === undefined || employees.error !== undefined) {
        return employees;
    } else {
        employees.forEach(emp => {
            delete emp.password;
            emp["manager_flag"] = Boolean(emp["manager_flag"]);
        });
    
        return {"employees" : employees};
    }
}

module.exports = router;
