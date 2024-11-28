// controllers/projectController.js
const Project = require('../models/Project');
const Portfolio = require('../models/Portfolio');

// @desc    Add a new project to a portfolio
// @route   POST /api/projects/:portfolioId
// @access  Private
exports.addProject = async (req, res) => {
  const { name, description, githubLink, liveDemo, multimedia } = req.body;

  try {
    const portfolio = await Portfolio.findById(req.params.portfolioId);

    if (portfolio && portfolio.user.toString() === req.user._id.toString()) {
      const project = new Project({
        name,
        description,
        githubLink,
        liveDemo,
        multimedia,
        portfolio: portfolio._id,
      });

      const createdProject = await project.save();

      portfolio.projects.push(createdProject._id);
      await portfolio.save();

      res.status(201).json(createdProject);
    } else {
      res.status(404).json({ message: 'Portfolio Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all projects of a portfolio
// @route   GET /api/projects/:portfolioId
// @access  Private
exports.getProjects = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.portfolioId).populate('projects');

    if (portfolio && portfolio.user.toString() === req.user._id.toString()) {
      res.json(portfolio.projects);
    } else {
      res.status(404).json({ message: 'Portfolio Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  const { name, description, githubLink, liveDemo, multimedia } = req.body;

  try {
    const project = await Project.findById(req.params.id).populate('portfolio');

    if (project && project.portfolio.user.toString() === req.user._id.toString()) {
      project.name = name || project.name;
      project.description = description || project.description;
      project.githubLink = githubLink || project.githubLink;
      project.liveDemo = liveDemo || project.liveDemo;
      project.multimedia = multimedia || project.multimedia;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('portfolio');

    if (project && project.portfolio.user.toString() === req.user._id.toString()) {
      await project.remove();

      // Remove project reference from portfolio
      project.portfolio.projects.pull(project._id);
      await project.portfolio.save();

      res.json({ message: 'Project Removed' });
    } else {
      res.status(404).json({ message: 'Project Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
