const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
