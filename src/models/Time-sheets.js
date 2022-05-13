const mongoose = require('mongoose');

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  project: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
  },
  weekSprint: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
  hoursProject: {
    type: Number,
    required: true,
  },
  workDescription: {
    type: String,
    required: true,
  },
});
const TimeSheets = mongoose.model('TimeSheet', timeSheetSchema);
module.exports = TimeSheets;
