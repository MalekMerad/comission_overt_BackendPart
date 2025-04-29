require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Hado li rahom fi folder Routes 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});