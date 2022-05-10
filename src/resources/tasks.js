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

const editTask = (req, res) => {
  const { id } = req.params;
  const task = taskData.find((item) => item.id === parseInt(id, 10));

  if (!task) {
    res.status(200).json({
      msg: `The task with ID ${id} does not exist`,
    });
  } else {
    const updTask = req.body;
    elements.forEach((prop) => {
      task[prop] = updTask[prop] ? updTask[prop] : task[prop];
    });
    fs.writeFile('src/data/tasks.json', JSON.stringify(taskData), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json({
          msg: 'The task was updated',
        });
      }
    });
  }
};

const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = taskData.find((item) => item.id === parseInt(id, 10));

  if (!task) {
    res.status(200).json({
      msg: `The task with ID ${id} does not exist`,
    });
  } else {
    res.status(200).json({
      data: task,
    });
  }
};
const deleteTask = (req, res) => {
  const { id } = req.params;
  const filterTasks = taskData.filter((task) => task.id !== parseInt(id, 10));

  if (taskData.length === filterTasks.length) {
    res.status(404).json({
      msg: `${id} not found`,
    });
  } else {
    fs.writeFile('src/data/tasks.json', JSON.stringify(filterTasks), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200).json({
          msg: `The tasks ${id} has been deleted`,
        });
      }
    });
  }
};

export {
  createTask,
  editTask,
  getTaskById,
  deleteTask,
};
