// models/Portfolio.js
const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  multimedia: [{
    type: String, // URLs to media files
  }],
  skills: [{
    type: String,
  }],
  certifications: [{
    title: String,
    link: String,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
