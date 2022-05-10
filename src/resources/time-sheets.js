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
export {
    gettimeSheetById
}

/* EDIT / PUT */

const fs = require('fs');
const editTimeSheet = (req, res) => {
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
export {
    editTimeSheet,
}
