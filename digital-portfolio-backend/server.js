// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Import Routes
const authRoutes = require('../backend/routes/auth');
const portfolioRoutes = require('../backend/routes/portfolios');
const projectRoutes = require('../backend/routes/projects');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/projects', projectRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Digital Portfolio Builder API');
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
