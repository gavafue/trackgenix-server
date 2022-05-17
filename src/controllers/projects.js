import models from '../models/Projects';

const getAllProjects = async (req, res) => {
    try {
      let projects = 0;
      if (req.query) {
        projects = await models.find(req.query);
        if (projects === 0) {
          return res.status(404).json({
            message: 'Projects not found',
            data: undefined,
            error: true,
          });
        }
      } else {
        projects = await models.find({});
      }
      return res.status(200).json({
        message: 'Project found',
        data: projects,
        error: false,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'An error occurred',
        data: undefined,
        error: true,
      });
    }
  };

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await models.findById(req.params.id);
      if (!project) {
        return res.status(404).json({
          msg: 'The id is not valid',
          data: project,
          error: true,
        });
      }
      return res.status(200).json({
        msg: project,
        data: undefined,
        error: false,
      });
    }
    return res.status(400).json({
      msg: 'The id is not valid',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      msg: 'The id is not valid',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
};
