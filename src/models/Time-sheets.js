import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  weekSprint: {
    type: Number,
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
  },
  workDescription: {
    type: String,
    required: true,
  },
});

export default mongoose.model('TimeSheet', timeSheetSchema);
