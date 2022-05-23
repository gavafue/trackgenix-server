import TimeSheetModel from '../models/Time-sheets';
import ProjectModel from '../models/Projects';
import EmployeeModel from '../models/Employees';

const createTimeSheet = async (req, res) => {
  try {
    const timeSheet = new TimeSheetModel({
      project: req.body.project,
      employee: req.body.employee,
      weekSprint: req.body.weekSprint,
      date: req.body.date,
      hoursWorked: req.body.hoursWorked,
      hoursProject: req.body.hoursProject,
      workDescription: req.body.workDescription,
    });
    const resultProject = await ProjectModel.findById(req.body.project);
    const resultEmployee = await EmployeeModel.findById(req.body.employee);
    if (!resultProject || !resultEmployee) {
      return res.status(404).json({
        message: `There is no project with id ${req.body.project} or employee with the id: ${req.body.employee}`,
        data: undefined,
        error: true,
      });
    }
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
    getAllTS = await TimeSheetModel.find(req.query).populate('employee', ['firstName', 'lastName'])
      .populate('project', 'name');
    if (getAllTS === 0) {
      return res.status(404).json({
        message: 'Time-sheet was not found',
        data: undefined,
        error: true,
      });
    }
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
    const timeSheet = await TimeSheetModel.findById(req.params.id).populate('employee', ['firstName', 'lastName'])
      .populate('project', 'name');
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
