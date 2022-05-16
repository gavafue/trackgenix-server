import models from '../models/Tasks';

const createTask = async(req, res) => {
    try {
        const task = new models.Task({
            nameProject: req.body.nameProject,
            week: req.body.week,
            day: req.body.day,
            description: req.body.description,
            hours: req.body.hours,
        });
        const result = await task.save();
        return res.status(200).json({
            message: 'Task created successfully',
            result,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Task could not be created',
            error,
        });
    }
}

// const editTask = (req, res) => {
//   const { id } = req.params;
//   const task = taskData.find((item) => item.id === parseInt(id, 10));

//   if (!task) {
//     res.status(200).json({
//       msg: `The task with ID ${id} does not exist`,
//     });
//   } else {
//     const updTask = req.body;
//     elements.forEach((prop) => {
//       task[prop] = updTask[prop] ? updTask[prop] : task[prop];
//     });
//     fs.writeFile('src/data/tasks.json', JSON.stringify(taskData), (err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.status(200).json({
//           msg: 'The task was updated',
//         });
//       }
//     });
//   }
// };

// const getTaskById = (req, res) => {
//   const { id } = req.params;
//   const task = taskData.find((item) => item.id === parseInt(id, 10));

//   if (!task) {
//     res.status(200).json({
//       msg: `The task with ID ${id} does not exist`,
//     });
//   } else {
//     res.status(200).json({
//       data: task,
//     });
//   }
// };

// const deleteTask = (req, res) => {
//   const { id } = req.params;
//   const filterTasks = taskData.filter((task) => task.id !== parseInt(id, 10));

//   if (taskData.length === filterTasks.length) {
//     res.status(404).json({
//       msg: `${id} not found`,
//     });
//   } else {
//     fs.writeFile('src/data/tasks.json', JSON.stringify(filterTasks), (error) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.status(200).json({
//           msg: `The tasks ${id} has been deleted`,
//         });
//       }
//     });
//   }
// };

// const getTasksByHours = (req, res) => {
//   const { hours } = req.params;
//   const filterTasks = taskData.filter((task) => task.hours >= hours);

//   res.status(200).json({
//     data: filterTasks,
//   });
// };

export default createTask;

// export {
//   createTask,
//   editTask,
//   getTaskById,
//   deleteTask,
//   getTasksByHours,
// };
