// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  githubLink: {
    type: String,
  },
  liveDemo: {
    type: String,
  },
  multimedia: [{
    type: String, // URLs to media files
  }],
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
