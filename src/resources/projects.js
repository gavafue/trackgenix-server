const fs = require('fs');
// load the projects data
const projectsData = require('../data/projects.json');

const elements = ['id', 'name', 'members', 'description', 'client', 'active', 'startDate', 'endDate'];

const createProject = (req, res) => {
  const newProject = req.body;
  newProject.id = Math.floor(Math.random() * 100000);
  newProject.active = true;

  const validateElements = elements.every((item) => Object.keys(newProject).includes(item));
  const foundID = projectsData.some((project) => project.id === newProject.id);

  if (validateElements && !foundID) {
    projectsData.push(newProject);
    fs.writeFile('src/data/projects.json', JSON.stringify(projectsData), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          msg: 'Project created',
        });
      }
    });
  } else {
    res.json({
      msg: 'Project could not be created',
    });
  }
};

const editProject = (req, res) => {
  const { id } = req.params;
  const project = projectsData.find((item) => item.id === parseInt(id, 10));

  if (!project) {
    res.json({
      msg: `The project with ID ${id} does not exist`,
    });
  } else {
    const updProject = req.body;
    elements.forEach((prop) => {
      project[prop] = updProject[prop] ? updProject[prop] : project[prop];
    });
    fs.writeFile('src/data/projects.json', JSON.stringify(projectsData), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          msg: 'The project was updated',
        });
      }
    });
  }
};

const getProjectById = (req, res) => {
  const { id } = req.params;
  const project = projectsData.find((item) => item.id === parseInt(id, 10));

  if (!project) {
    res.json({
      msg: `The project with ID ${id} does not exist`,
    });
  } else {
    res.json({
      data: project,
    });
  }
};

export {
  createProject,
  getProjectById,
  editProject,
};
