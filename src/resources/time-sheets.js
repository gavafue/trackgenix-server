const timeSheets = require('../data/time-sheets.json');
const fs = require('fs');

const createTimeSheet = async (req, res) => {
    const timeSData = req.body;
    timeSheets.push(timeSData);
    fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
        if (err) {
            res.send('Error!\n' + err);
        }
        else {
            res.send('New time sheet created.');
        }
    })
}

export {
    createTimeSheet,
}