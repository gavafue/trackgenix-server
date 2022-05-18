import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema({
  nameProject: {
    type: Text,
    require: true,
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
    type: Text,
    require: true,
  },
  hours: {
    type: Number,
    require: true,
  },
});

const Tasks = mongoose.model('Tasks', tasksSchema);
export default Tasks;
