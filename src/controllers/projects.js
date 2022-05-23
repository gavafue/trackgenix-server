import ProjectsModels from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    let projects = 0;
    if (req.query) {
      projects = await ProjectsModels.find(req.query).populate('members.name', ['firstName',
        'lastName', 'email']);
      if (projects.length === 0) {
        return res.status(404).json({
          message: 'Projects not found',
          data: undefined,
          error: true,
        });
      }
    } else {
      projects = await ProjectsModels.find({});
    }
    return res.status(200).json({
      message: 'Project found',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      data: undefined,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await ProjectsModels.findById(req.params.id).populate('members.name', ['firstName',
        'lastName', 'email']);
      if (!project) {
        return res.status(404).json({
          message: `The ${req.params.id} is not valid`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Project found succesfull',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      message: `The ${req.params.id} is not valid`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: `The ${req.params.id} is not valid`,
      data: undefined,
      error: true,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new ProjectsModels({
      members: req.body.members,
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      active: req.body.active,
      client: req.body.client,
    });

    const result = await project.save();
    return res.status(201).json({
      message: 'Project created successfully.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter in request.',
        data: undefined,
        error: true,
      });
    }
    const result = await ProjectsModels.findByIdAndDelete(req.params.id).populate('members.name', ['firstName',
      'lastName', 'email']);
    if (!result) {
      return res.status(404).json({
        message: `The project with id ${req.params.id} can't be found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Project with id ${req.params.id} deleted.`,
      data: undefined,
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

const editProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter in request.',
        data: undefined,
        error: true,
      });
    }

    const result = await ProjectsModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate('members.name');

    if (!result) {
      return res.status(404).json({
        message: `The project with id ${req.params.id} can't be found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Project with id ${req.params.id} edited.`,
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
  createProject,
  deleteProject,
  editProject,
  getAllProjects,
  getProjectById,
};
