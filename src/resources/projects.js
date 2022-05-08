// load the projects data
const projecsData = require('../data/projects.json');

// Define the function that will get all the projects
const getProjectById = (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const id = req.params.id;
  // eslint-disable-next-line radix
  const project = projecsData.find((item) => item.id === parseInt(id));

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
  // eslint-disable-next-line import/prefer-default-export
  getProjectById,
};
