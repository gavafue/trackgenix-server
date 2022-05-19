import mongoose from 'mongoose';
import TimeSheetModel from '../models/Time-sheets';

const createTimeSheet = async (req, res) => {
  try {
    const findTimeSheet = await TimeSheetModel.findOne({ project: req.body.project });
    if (findTimeSheet) {
      return res.status(200).json({
        message: 'A time-sheet with this project name already exists',
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
      message: 'Time-Sheet created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getTimeSheets = async (req, res) => {
  try {
    let getAllTS = 0;
    if (req.query) {
      getAllTS = await TimeSheetModel.find(req.query);
      if (getAllTS === 0) {
        return res.status(404).json({
          message: 'Time-sheet was not found',
          data: undefined,
          error: true,
        });
      }
    } else { getAllTS = TimeSheetModel.find({}); }
    return res.status(200).json({
      message: 'The time-sheet was found',
      data: getAllTS,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getTimeSheetById = async (req, res) => {
  try {
    if (req.params.id) {
      const timeSheet = await TimeSheetModel.findById(req.params.id);
      if (!timeSheet) {
        return res.status(404).json({
          message: `The time sheet with id ${req.params.id} has not been found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The request was successful',
        data: timeSheet,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    const result = await TimeSheetModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The time-sheet updated successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteTimeSheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await TimeSheetModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The time sheet with id ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The time sheet with ${req.params.id} has been successfully deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createTimeSheet,
  getTimeSheets,
  updateTimesheet,
  getTimeSheetById,
  deleteTimeSheet,
};
