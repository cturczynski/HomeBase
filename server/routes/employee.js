const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');
const { getValueOrNull } = require('../services/queryService');

router.get('/', async function(req, res, next) {
    const id = getValueOrNull(req.query.id);
    const username = getValueOrNull(req.query.username);

    try {
        let employees = await employeeService.buildAndSendQuery(id, username);
        cleanEmployeeObjects(employees);
        let responseJson = {"employees" : employees};
        res.json(responseJson);
    } catch (err) {
        console.error('Error while getting employees ', err.message);
        next(err);
    }
})

router.post('/', async function(req, res, next) {
    console.log(req.body);
    res.json(req.body);

});

router.get('/all', async function(req, res, next) {
        try {
            var employees = await employeeService.getAllEmployees();
            cleanEmployeeObjects(employees);
            let responseJson = {"employees" : employees};
            res.json(responseJson);
        } catch (err) {
            console.error('Error while getting all employees ', err.message);
            next(err);
        }
});

function cleanEmployeeObjects(employees) {
    employees.forEach(emp => {
        delete emp.password;
        emp["manager_flag"] = Boolean(emp["manager_flag"]);
    });
}

module.exports = router;
