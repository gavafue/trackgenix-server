const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

/* eslint-disable import/prefer-default-export */

const createTimeSheet = async (req, res) => {
  const timeSData = req.body;
  if (timeSData.id && timeSData.project && timeSData.employeeName && timeSData.employeeId
    && timeSData.weekSprint && timeSData.date && timeSData.hoursWorked
    && timeSData.hoursProject && timeSData.workDescription) {
    timeSheets.push(timeSData);
    fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
      if (err) {
        res.send(`Error!\n${err}`);
      } else {
        res.send('New time sheet created.');
      }
    });
  } else {
    res.send('Missing data to create time sheet.');
  }
};

export {
  createTimeSheet,
};
