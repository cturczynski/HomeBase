const express = require('express');
const router = express.Router();
const shiftService = require('../services/shiftService');
const { getValueOrNull } = require('../services/queryService');


router.get('/', async function(req, res, next) {
    const id = getValueOrNull(req.query.id);
    const employee = getValueOrNull(req.query.employee);
    const date = getValueOrNull(req.query.date);
    const start = getValueOrNull(req.query.start);
    const end = getValueOrNull(req.query.end);

    try {
        let shifts = await shiftService.buildAndSendQuery(id, employee, date, start, end);
        let responseJson = {"shifts" : shifts};
        res.json(responseJson);
    } catch (err) {
        console.error('Error while getting shifts ', err.message);
        next(err);
    }
});

router.post('/', async function(req, res, next) {

});

router.get('/all', async function(req, res, next) {
        try {
            let shifts = await shiftService.getAllShifts();
            let responseJson = {"shifts" : shifts};
            res.json(responseJson);
        } catch (err) {
            console.error('Error while getting all shifts ', err.message);
            next(err);
        }
});

module.exports = router;