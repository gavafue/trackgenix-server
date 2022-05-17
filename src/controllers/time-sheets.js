import mongoose from 'mongoose';
import TimeSheetModel from '../models/Time-sheets';

const createTimeSheet = async (req, res) => {
  try {
    const findTimeSheet = await TimeSheetModel.findOne({ project: req.body.project });
    if (findTimeSheet) {
      return res.status(200).json({
        msg: 'An time-sheet with this project name already exists',
        data: undefined,
        error: true,
      });
    }
    const timeSheet = new TimeSheetModel({
      project: req.body.project,
      employeeName: req.body.employeeName,
      employeeId: mongoose.Types.ObjectId(),
      weekSprint: req.body.weekSprint,
      date: req.body.date,
      hoursWorked: req.body.hoursWorked,
      hoursProject: req.body.hoursProject,
      workDescription: req.body.workDescription,
    });
    const result = await timeSheet.save();
    return res.status(201).json({
      msg: 'Time-Sheet created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `There was an error: ${error}`,
      data: undefined,
      error: false,
    });
  }
};

export default {
  createTimeSheet,
};
