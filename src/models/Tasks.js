const mongoose = require('mongoose');

const { Schema } = mongoose;

const tasksSchema = new Schema({
  nameProject: {
    type: Text,
    require: true,
  },
  week: {
    type: Number,
    require: true,
  },
  day: {
    type: Date,
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
module.exports = Tasks;
