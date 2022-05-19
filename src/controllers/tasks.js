import Models from '../models/Tasks';

const createTask = async (req, res) => {
  try {
    const task = new Models({
      nameProject: req.body.nameProject,
      week: req.body.week,
      day: req.body.day,
      description: req.body.description,
      hours: req.body.hours,
    });
    const result = await task.save();
    return res.status(200).json({
      message: 'The request was successful',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
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
    const result = await Models.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({
        message: `The task with ID ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }
    const resultEdited = await Models.findById(req.params.id);
    return res.status(200).json({
      message: `Task with ID ${req.params.id} edited.`,
      data: resultEdited,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  const result = await Models.findById(req.params.id);
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
    return res.status(500).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'Missing ID parameter in request.',
        data: undefined,
        error: true,
      });
    }
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The task with ID ${req.params.id} can't be found.`,
        data: undefined,
        error: true,
      });
    }
    const resultDeleted = await Models.find(req.query || {});
    return res.status(200).json({
      message: `Task with ID ${req.params.id} deleted.`,
      data: resultDeleted,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const result = await Models.find(req.query || {});
    if (!result.length) {
      return res.status(404).json({
        message: 'Tasks not found',
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
    return res.status(500).json({
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
