// controllers/portfolioController.js
const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');

// @desc    Create a new portfolio
// @route   POST /api/portfolios
// @access  Private
exports.createPortfolio = async (req, res) => {
  const { title, template, skills, certifications } = req.body;

  try {
    const portfolio = new Portfolio({
      title,
      template,
      skills,
      certifications,
      user: req.user._id,
    });

    const createdPortfolio = await portfolio.save();
    res.status(201).json(createdPortfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all portfolios of the authenticated user
// @route   GET /api/portfolios
// @access  Private
exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id }).populate('projects');
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single portfolio by ID
// @route   GET /api/portfolios/:id
// @access  Private
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate('projects');

    if (portfolio && portfolio.user.toString() === req.user._id.toString()) {
      res.json(portfolio);
    } else {
      res.status(404).json({ message: 'Portfolio Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
exports.updatePortfolio = async (req, res) => {
  const { title, template, skills, certifications } = req.body;

  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (portfolio && portfolio.user.toString() === req.user._id.toString()) {
      portfolio.title = title || portfolio.title;
      portfolio.template = template || portfolio.template;
      portfolio.skills = skills || portfolio.skills;
      portfolio.certifications = certifications || portfolio.certifications;

      const updatedPortfolio = await portfolio.save();
      res.json(updatedPortfolio);
    } else {
      res.status(404).json({ message: 'Portfolio Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (portfolio && portfolio.user.toString() === req.user._id.toString()) {
      // Delete associated projects
      await Project.deleteMany({ portfolio: portfolio._id });

      await portfolio.remove();
      res.json({ message: 'Portfolio Removed' });
    } else {
      res.status(404).json({ message: 'Portfolio Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
