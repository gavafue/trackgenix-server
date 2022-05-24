import ModelsTasks from '../models/Tasks';
import ModelsProjects from '../models/Projects';

const createTask = async (req, res) => {
  try {
    const task = new ModelsTasks({
      nameProject: req.body.nameProject,
      week: req.body.week,
      day: req.body.day,
      description: req.body.description,
      hours: req.body.hours,
    });
    const resultProjectId = await ModelsProjects.findById(req.body.nameProject);
    if (!resultProjectId) {
      return res.status(404).json({
        message: `There is no project with the id: ${req.body.nameProject}`,
        data: undefined,
        error: true,
      });
    }
    const result = await task.save();
    return res.status(201).json({
      message: 'The task has been created successfully',
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

const editTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'The id parameter is missing in the request.',
        data: undefined,
        error: true,
      });
    }
    const result = await ModelsTasks.findByIdAndUpdate(req.params.id, req.body).populate({
      path: 'nameProject',
      select: 'name',
    });
    if (!result) {
      return res.status(404).json({
        message: `The task with ID ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    const resultEdited = await ModelsTasks.findById(req.params.id);
    return res.status(200).json({
      message: `Task with ID ${req.params.id} edited.`,
      data: resultEdited,
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

const getTaskById = async (req, res) => {
  const result = await ModelsTasks.findById(req.params.id).populate({ path: 'nameProject', select: 'name' });
  try {
    if (!result) {
      return res.status(404).json({
        message: `The task with ID ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task successfully completed',
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

const deleteTask = async (req, res) => {
  try {
    const result = await ModelsTasks.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The task with ID ${req.params.id} can't be found.`,
        data: undefined,
        error: true,
      });
    }
    const resultDeleted = await ModelsTasks.find(req.query || {});
    return res.status(200).json({
      message: `Task with ID ${req.params.id} deleted.`,
      data: resultDeleted,
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

const getAllTask = async (req, res) => {
  try {
    const result = await ModelsTasks.find(req.query).populate({ path: 'nameProject', select: 'name' });
    if (!result.length) {
      return res.status(404).json({
        message: 'Tasks was not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Tasks lists fetched successfully',
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
  createTask,
  editTask,
  getTaskById,
  deleteTask,
  getAllTask,
};
