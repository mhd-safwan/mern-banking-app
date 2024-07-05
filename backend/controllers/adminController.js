const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !await bcrypt.compare(password, admin.password)) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).send('Admin login failed');
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).send('Failed to get users');
  }
};

const disableUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.disabled = !user.disabled;
    await user.save();
    res.send('User status updated');
  } catch (error) {
    res.status(400).send('Failed to update user status');
  }
};

module.exports = { loginAdmin, getUsers, disableUser };
