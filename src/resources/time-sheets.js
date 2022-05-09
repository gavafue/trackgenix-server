const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

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

const deleteTimeSheet = async (req, res) => {
  const timeSId = req.params.id;
  const filteredTS = timeSheets.filter((timeSheet) => (timeSheet.id).toString() !== timeSId);
  if (timeSheets.length === filteredTS.length) {
    res.send(`Time sheet with id ${timeSId} not found.`);
  } else {
    fs.writeFile('./src/data/time-sheets.json', JSON.stringify(filteredTS), (err) => {
      if (err) {
        res.send(`Error!\n${err}`);
      } else {
        res.send(`Time sheet with id ${timeSId} deleted.`);
      }
    });
  }
};

const filterTSByName = async (req, res) => {
    const timeSName = req.params.employeeName;
    const filteredTS = timeSheets.filter((timeSheet) => timeSheet.employeeName === timeSName);
    if (filteredTS.length === 0) {
        res.send(`The employee ${timeSName} does not have a time sheet created.`);
    } else {
        res.send(filteredTS);
    }
}

export {
  createTimeSheet,
  deleteTimeSheet,
  filterTSByName,
};
