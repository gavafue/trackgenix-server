const fs = require('fs');
// load the projects data
const projectsData = require('../data/projects.json');

const elements = ['id', 'name', 'members', 'description', 'client', 'active', 'startDate', 'endDate'];

// Function that creates one project
const createProject = (req, res) => {
  const newProject = req.body;
  newProject.id = Math.floor(Math.random() * 100000);
  newProject.active = true;
  // this function validates that every item inside elements is contained in the created project
  const validateElements = elements.every((item) => Object.keys(newProject).includes(item));
  // this functions returns true if the id of the new project already exists
  const foundID = projectsData.some((project) => project.id === newProject.id);

  if (validateElements && !foundID) {
    projectsData.push(newProject);
    fs.writeFile('src/data/projects.json', JSON.stringify(projectsData), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(201).json({
          msg: 'Project created',
        });
      }
    });
  } else {
    res.status(400).json({
      msg: 'Project could not be created',
    });
  }
};

// Function that obtains one project by its id
const getProjectById = (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const id = req.params.id;
  // eslint-disable-next-line radix
  const project = projectsData.find((item) => item.id === parseInt(id));

  if (!project) {
    res.status(200).json({
      msg: `The project with ID ${id} does not exist`,
    });
  } else {
    res.status(200).json({
      data: project,
    });
  }
};

// Export the functions
export {
  createProject,
  getProjectById,
};
