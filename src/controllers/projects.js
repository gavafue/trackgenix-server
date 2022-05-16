import ProjectsModels from '../models/Projects';

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
      msg: 'The request was successful',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing id parameter in request.',
        data: undefined,
        error: true,
      });
    }
    const result = await ProjectsModels.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: `The project with id ${req.params.id} can't be found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: `Project with id ${req.params.id} deleted.`,
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createProject,
  deleteProject,
};
