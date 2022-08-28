const express = require('express');
const router = express.Router();
const shiftService = require('../services/shiftService');
const employeeService = require('../services/employeeService');
const { getValueOrNull, sanitizeDbObject, cleanUpdateResult } = require('../services/queryService');


router.get('/', async function(req, res, next) {
    const id = getValueOrNull(req.query.id);
    const employee = getValueOrNull(req.query.employee);
    const date = getValueOrNull(req.query.date);
    const start = getValueOrNull(req.query.start);
    const end = getValueOrNull(req.query.end);

    try {
        let shifts = await shiftService.buildAndSendSelectQuery(id, employee, date, start, end);
        let responseJson = await cleanShiftObjects(shifts);
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
        let responseJson = await cleanShiftObjects(shifts);
        res.json(responseJson);
    } catch (err) {
        console.error('Error while getting all shifts ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
});

router.post('/update', async function(req, res, next) {
    console.log(req.body);
    try {
        let cleanedBody = await sanitizeDbObject(req.body, "shift");
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

router.post('/create', async function(req, res, next) {
    console.log(req.body);
    try {
        let cleanedBody = await sanitizeDbObject(req.body, "shift");
        if (cleanedBody.error !== undefined) {
            res.json(cleanedBody);
        } else {
            let insertResult = await shiftService.buildAndSendInsertQuery(cleanedBody);
            let jsonResponse = cleanUpdateResult(insertResult);
            res.json(jsonResponse);
        }
    } catch (err) {
        console.error('Error while inserting shift ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
});

router.post('/setTips', async function(req, res, next) {
    let totalTips = getValueOrNull(req.body["total_tips"]);
    let date = getValueOrNull(req.body["date"]);
    
    if (!isNaN(totalTips) && date !== null) {
        try {
            let allShifts = await shiftService.buildAndSendSelectQuery(null, null, date, null, null);
            if (allShifts.error === undefined) {
                let shiftUpdateStatus = await addTipsAndSaveToDb(allShifts, totalTips);
                res.json(shiftUpdateStatus)
            } else {
                res.json(allShifts);
            }
        } catch (err) {
            console.error('Error while updating tips ', err.message);
            res.json({"error" : err.message});
            next(err);
        }
    } else {
        res.json({"error" : "Please set totalTips as float value and date in YYYY-MM-dd format."})
    }
})

router.get('/setData', async function(req, res, next) {
    const date = getValueOrNull(req.query.date) === null ? new Date() : getValueOrNull(req.query.date);

    try {
        //make array of 7 days prior (loop)
        let dates = [];
        for (var i = 6; i >= 0; i--) {
            let nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() - i);
            dates.push(nextDate);
        }
        console.log(dates);
        //make manager and bartender/barback array (get all employees call)
        let allEmps = await employeeService.getAllEmployees();
        let managers = allEmps.filter(emp => { return emp["manager_flag"] });
        let workers = allEmps.filter(emp => { return !emp["manager_flag"]; });

        let shiftsToMake = [];
        //for each day, randomly select from arrays 2 managers, 2 barbacks, 2 bartenders (3 for all for weekends)
        //1 of each for AM shift (10a - 5p), 2 for PM shift (5p - 12a)
        dates.forEach(day => {
            let managersArr = [...managers];
            let workersArr = [...workers];
            let staffQuota = (day.getDay() === 6 || day.getDay() === 5) ? 3 : 2;
            for (var i = 0; i < staffQuota; i++) {
                let amFlag = (i === 0);
                shiftsToMake.push(makeShiftWithRandomMember(managersArr, day, "MANAGER", amFlag));
                shiftsToMake.push(makeShiftWithRandomMember(workersArr, day, "BARTENDER", amFlag));
                shiftsToMake.push(makeShiftWithRandomMember(workersArr, day, "BARBACK", amFlag));
            }
        })

        //create all these shifts
        await Promise.all(shiftsToMake.map(async (shift) => {
            let insertResult = await shiftService.buildAndSendInsertQuery(shift);
            console.log(insertResult);
        }));

        //create range of tips (2000 - 4000)  Math.random() * (max - min) + min
        //for each date, set tips with randomly selected total tips from range (Promise.all)
        let returnStatusDict = {};
        await Promise.all(dates.map(async (day) => {
            let totalTips = (Math.random() * (3000 - 1000) + 1000).toFixed(2);
            let dateString = day.toISOString().split('T')[0];
            let retrievedShifts = await shiftService.buildAndSendSelectQuery(null, null, `'${dateString}'`, null, null);
            if (retrievedShifts.error === undefined) {
                let shiftUpdateStatus = await addTipsAndSaveToDb(retrievedShifts, totalTips);
                returnStatusDict[dateString] = shiftUpdateStatus
            } else {
                console.error('Error while retrieving new shifts: ', retrievedShifts);
                returnStatusDict[dateString] = retrievedShifts;
            }
        }));

        res.json(returnStatusDict);
    } catch (err) {
        console.error('Error while setting data ', err.message);
        res.json({"error" : err.message});
        next(err);
    }
})

function makeShiftWithRandomMember(empArray, date, position, amFlag) {
    let randomIndex = Math.floor(Math.random() * empArray.length);
    let employee = empArray[randomIndex];
    empArray.splice(randomIndex, 1);
    let start = new Date(date);
    let end  = new Date(date);
    if (amFlag) {
        start.setUTCHours(10,00,00,000);
        end.setUTCHours(17,00,00,000);
    } else {
        start.setUTCHours(17,00,00,000);
        end.setDate(end.getDate() + 1);
        end.setUTCHours(0,00,00,000);
    }
    let shift = {
        "id": 0,
        "date": date,
        "employee_id": employee.id,
        "position": position,
        "start": start,
        "end": end,
        "clock_in": start,
        "clock_out": end,
        "tips": null,
        "total_tips": null
    };

    return shift;
}

async function cleanShiftObjects(shifts) {
    if (shifts === undefined || shifts.error !== undefined) {
        return shifts;
    } else {
        let cleanShifts = await clockOutOldShifts(shifts);
        return {"shifts" : cleanShifts};
    }
}

async function clockOutOldShifts(shifts) {
    var shiftsToUpdate = [];
    shifts.forEach(shift => {
        if (getValueOrNull(shift["clock_in"]) !== null && getValueOrNull(shift["clock_out"]) === null) {
            let shiftDate = new Date(shift.date);
            let cutOffDate = new Date(shift.date);
            cutOffDate.setDate((shiftDate.getDate() + 1));
            cutOffDate.setUTCHours(4,00,00,000);
            if (new Date() > cutOffDate) {
                shift["clock_out"] = cutOffDate.toISOString();
                shiftsToUpdate.push(shift);
            }
        }
    })
    
    await Promise.all(shiftsToUpdate.map( async (shift) => {
        let updateResult = await updateShiftToDb(shift, "clock_out");
        console.log(updateResult);
    }));

    return shifts
}

function calculateShiftTime(shift) {
    let inTime = getValueOrNull(shift["clock_in"]);
    let outTime = getValueOrNull(shift["clock_out"]);
    let inTimeDate = Date.parse(inTime);
    let outTimeDate = Date.parse(outTime);

    return Math.abs(outTimeDate - inTimeDate) / (3600 * 1000);
}

async function updateShiftToDb(shift, property) {
    let updateResult = await shiftService.buildAndSendUpdateQuery(shift);
    console.log(`Updated ${property} for shift with id ? with result ?`, [shift.id, updateResult]);
    return updateResult;
}

async function addTipsAndSaveToDb(shifts, totalTips) {
    var filledShifts = shifts.filter(shift => 
        getValueOrNull(shift["clock_in"] !== null && getValueOrNull(shift["clock_out"]) !== null));
    var totalHours = 0.0;
    var shiftHourDict = [];
    var shiftUpdateStatus = {};

    filledShifts.forEach(shift => {
        if (shift["position"] !== "MANAGER") {
            let tipPoolMultiplier = shift["position"] === "BARTENDER" ? 0.75 : 0.25;
            let shiftHours = calculateShiftTime(shift) * tipPoolMultiplier;
            shiftHourDict[shift.id] = shiftHours;
            totalHours += shiftHours;
        }
    });

    await Promise.all(filledShifts.map( async (shift) => {
        shift["total_tips"] = totalTips;
        shift["tips"] = ((shiftHourDict[shift.id] / totalHours) * totalTips).toFixed(2);
        let updateResult = await updateShiftToDb(shift, "tips");
        shiftUpdateStatus[shift.id.toString()] = updateResult;
    }));

    return shiftUpdateStatus;
}

module.exports = router;