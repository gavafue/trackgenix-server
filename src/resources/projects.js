/* eslint-disable eqeqeq */
const fileSystem = require('fs');

const projects = require('../data/projects.json');

// Delete Projects

const deleteProjects = (req, res) => {
  const projectID = req.params.id;

  const filterProjects = projects.filter((project) => project.id != projectID);

  if (projects.length === filterProjects.length) {
    res.status(404).json({
      msg: `Not project ${projectID} not found`,
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

export default deleteProjects;
