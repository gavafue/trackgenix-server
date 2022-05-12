/* GET */

/* import { Router } from 'express'; */


const timeSheetsData = require('../data/time-sheets.json');

const gettimeSheetById = async (req, res) => {
    const id = req.params.id;
    const timeSheetFind = timeSheetsData.find(item => item.id == parseInt(id));

    console.log('timeSheetFind', timeSheetFind)

    if (!timeSheetFind) {
        res.json({
            msg: `This time Sheet with ID ${id} does not exist`
        });
    } res.json({
        data: timeSheetFind
    })
}

/* EDIT / PUT */

const fs = require('fs');
const editTimeSheet = async (req, res) => {
    const { id } = req.params;
    const timeSheetFind = timeSheetsData.find((item) => item.id == parseInt(id));
    
    if (!timeSheetFind) {
        res.json({
            msg: `This time Sheet with ID ${id} does not exist`
        });
    } else {
        const bodyTSheet = req.body;
            timeSheetFind.id = bodyTSheet.id ? bodyTSheet.id : timeSheetFind.id;
            timeSheetFind.project = bodyTSheet.project ? bodyTSheet.project : timeSheetFind.project;
            timeSheetFind.employeeName = bodyTSheet.employeeName ? bodyTSheet.employeeName : timeSheetFind.employeeName;
            timeSheetFind.employeeId = bodyTSheet.employeeId ? bodyTSheet.employeeId : timeSheetFind.employeeId;
            timeSheetFind.weekSprint = bodyTSheet.weekSprint ? bodyTSheet.weekSprint : timeSheetFind.weekSprint;
            timeSheetFind.date = bodyTSheet.date ? bodyTSheet.date : timeSheetFind.date;
            timeSheetFind.hoursWorked = bodyTSheet.hoursWorked ? bodyTSheet.hoursWorked : timeSheetFind.hoursWorked;
            timeSheetFind.hoursProject = bodyTSheet.hoursProject ? bodyTSheet.hoursProject : timeSheetFind.hoursProject;
            timeSheetFind.workDescription = bodyTSheet.workDescription ? bodyTSheet.workDescription : timeSheetFind.workDescription;
        
        fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheetsData), (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    msg: `This Time Sheet ${id} was updated.`,
                });
            }
        });
    }
};

/* FILTER PROJECT */

const filterTSheetProject = async (req, res) => {
    const TSheetProject = req.params.project;
    const filterProject = timeSheetsData.filter((proyecItem) => proyecItem.project === TSheetProject);
    if (filterProject.length === 0) {
        res.send(`This ${TSheetProject} does not have any time sheet created.`)
    } else {
        res.send(filterProject)
    }
}


const createTimeSheet = async (req, res) => {
  const timeSData = req.body;
  if (timeSData.id && timeSData.project && timeSData.employeeName && timeSData.employeeId
    && timeSData.weekSprint && timeSData.date && timeSData.hoursWorked
    && timeSData.hoursProject && timeSData.workDescription) {
    timeSheetsData.push(timeSData);
    fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timeSheetsData), (err) => {
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
  const filteredTS = timeSheetsData.filter((timeSheet) => (timeSheet.id).toString() !== timeSId);
  if (timeSheetsData.length === filteredTS.length) {
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
  const filteredTS = timeSheetsData.filter((timeSheet) => timeSheet.employeeName === timeSName);
  if (filteredTS.length === 0) {
    res.send(`The employee ${timeSName} does not have a time sheet created.`);
  } else {
    res.send(filteredTS);
  }
};

export {
  createTimeSheet,
  deleteTimeSheet,
  filterTSByName,
  gettimeSheetById,
  editTimeSheet,
  filterTSheetProject
};
