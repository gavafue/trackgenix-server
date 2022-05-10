const fs = require('fs');
const taskData = require('../data/tasks.json');

const elements = ['nameProject', 'week', 'day', 'description', 'hours'];

const createTask = (req, res) => {
  const newTask = req.body;
  const validateElements = elements.every((item) => Object.keys(newTask).includes(item));

  newTask.id = Math.floor(Math.random() * 10000);

  const foundID = taskData.some((task) => task.id === newTask.id);

  if (validateElements && !foundID) {
    taskData.push(newTask);
    fs.writeFile('src/data/tasks.json', JSON.stringify(taskData), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json({
          msg: 'Task created',
        });
      }
    });
  } else {
    res.status(400).json({
      msg: 'Task could not be created',
    });
  }
};

export default createTask;
