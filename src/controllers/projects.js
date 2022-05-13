/* eslint-disable eqeqeq */
const fileSystem = require('fs');

const projects = require('../data/projects.json');

// Delete Projects

const deleteProjects = (req, res) => {
  const projectID = req.params.id;

  const filterProjects = projects.filter((project) => project.id != projectID);

  if (projects.length === filterProjects.length) {
    res.status(404).json({
      msg: `The project ${projectID} not found`,
    });
  } else {
    fileSystem.writeFile('src/data/projects.json', JSON.stringify(filterProjects), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200).json({
          msg: `The project ${projectID} has been deleted`,
        });
      }
    });
  }
};

// Obtain project with filter

const getProjects = (req, res) => {
  // eslint-disable-next-line no-shadow
  const filterProjects = projects.filter((projects) => projects.active == true);
  res.status(200).json({
    data: filterProjects,
  });
};

// Assignation role a member on project

const assignRP = (req, res) => {
  const membersData = req.body;
  const { projectId } = req.params;
  const projectToBoost = projects.find((item) => item.id === parseInt(projectId, 10));
  const validIds = projects.map((pro) => pro.id);
  const neededKeys = ['id', 'role'];
  const roles = ['QA', 'PM', 'DEV', 'TL'];
  // Check if project exists
  if (!projectToBoost) {
    res.status(404).send(`Project with ID: ${projectId} not found. Valid IDs: ${validIds}`);
  }
  if (neededKeys.every((key) => Object.keys(membersData).includes(key))
        && Object.values(membersData).every((value) => value !== '')
        && roles.some((key) => membersData.role === key)) {
    projectToBoost.members.push(membersData);
    fileSystem.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send('Employee added');
      }
    });
  } else if (roles.every((key) => membersData.role !== key)) {
    res.status(406).send('Role not acceptable. Use QA, PM, DEV or TL');
  } else {
    res.status(400).send('Complete all fields with valid inputs');
  }
};
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
    fileSystem.writeFile('src/data/projects.json', JSON.stringify(projectsData), (err) => {
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
    fileSystem.writeFile('src/data/projects.json', JSON.stringify(projectsData), (err) => {
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
  deleteProjects,
  getProjects,
  assignRP,
  createProject,
  getProjectById,
  editProject,
};
