import models from '../models/Projects';

const createProject = async (req, res) => {
    try {
        const project = new models.Project({
            members: req.body.members,
            startDate: req.body.startDate,
            finishDate: req.body.finishDate,
            description: req.body.description,
            status: req.body.status,
            client: req.body.client,
        });

        const result = await project.save();
        return res.status(201).json(result);
    } catch (error) {
        return res.json({
            msg: 'An error has ocurred',
            error: error.details[0].message,
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                msg: 'Missing id parameter in request.',
            });
        }
        const result = models.Project.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({
                msg: `The project with id ${req.params.id} can't be found.`,
            });
        }
        return res.status(204).json({
            msg: `Project with id ${req.params.id} deleted.`,
        });
    } catch (error) {
        return res.json({
            msg: 'An error has ocurred.',
        });
    }
};

export default {
    createProject,
    deleteProject,
};
