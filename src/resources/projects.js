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

export {
  deleteProjects,
  getProjects,
  assignRP,
};
