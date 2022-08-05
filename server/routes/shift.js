const express = require('express');
const router = express.Router();
const shiftService = require('../services/shiftService');
const { getValueOrNull, sanitizeUpdateObject, cleanUpdateResult } = require('../services/queryService');


router.get('/', async function(req, res, next) {
    const id = getValueOrNull(req.query.id);
    const employee = getValueOrNull(req.query.employee);
    const date = getValueOrNull(req.query.date);
    const start = getValueOrNull(req.query.start);
    const end = getValueOrNull(req.query.end);

    try {
        let shifts = await shiftService.buildAndSendSelectQuery(id, employee, date, start, end);
        let responseJson = cleanShiftObjects(shifts);
        res.json(responseJson);
    } catch (err) {
        console.error('Error while getting shifts ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
});

router.get('/all', async function(req, res, next) {
    try {
        let shifts = await shiftService.getAllShifts();
        let responseJson = cleanShiftObjects(shifts);
        res.json(responseJson);
    } catch (err) {
        console.error('Error while getting all shifts ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
});

router.post('/', async function(req, res, next) {
    console.log(req.body);
    try {
        let cleanedBody = await sanitizeUpdateObject(req.body, "shift");
        if (cleanedBody.error !== undefined) {
            res.json(cleanedBody);
        } else {
            let updateResult = await shiftService.buildAndSendUpdateQuery(cleanedBody);
            let jsonResponse = cleanUpdateResult(updateResult);
            res.json(jsonResponse);
        }
    } catch (err) {
        console.error('Error while updating shift ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
});

function cleanShiftObjects(shifts) {
    if (shifts === undefined || shifts.error !== undefined) {
        return shifts;
    } else {
        return {"shifts" : shifts};
    }
}

module.exports = router;