const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());

// Set up PostgreSQL connection with Sequelize
const sequelize = new Sequelize('postgres://user:password@postgres:5432/crudapp', {
  dialect: 'postgres',
  logging: false,
});

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Routes for CRUD operations
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create({ name: req.body.name });
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.name = req.body.name;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Start the server after database is ready
const PORT = 3000;

async function startServer() {
  let connected = false;

  while (!connected) {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to database');
      connected = true;
    } catch (err) {
      console.log('⏳ Waiting for database to be ready...');
      await new Promise(res => setTimeout(res, 3000)); // Wait 3 seconds
    }
  }

  await sequelize.sync();
  console.log('📦 Database synced');

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();
