import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema({
  nameProject: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Project',
  },
  week: {
    type: Number,
    require: true,
  },
  day: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  hours: {
    type: Number,
    require: true,
  },
});

const Tasks = mongoose.model('Tasks', tasksSchema);
export default Tasks;
