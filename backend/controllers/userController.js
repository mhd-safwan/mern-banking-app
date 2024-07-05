const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Registration failed');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }
    if (user.disabled) {
      return res.status(403).send('User account was suspended by admin');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Login failed');
  }
};

const getUserDashboard = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);
    if (user.disabled) {
      return res.status(403).send('Account is disabled');
    }
    const transactions = await Transaction.find({ userId });
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'deposit' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    res.json({ userDetails: { username: user.username }, balance, transactions });
  } catch (error) {
    res.status(500).send('Failed to get dashboard data');
  }
};

const deposit = async (req, res) => {
  const { amount } = req.body;
  try {
    const newTransaction = new Transaction({ userId: req.user.userId, type: 'deposit', amount });
    await newTransaction.save();
    res.status(201).send('Deposit successful');
  } catch (error) {
    res.status(500).send('Deposit failed');
  }
};

const withdraw = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.userId;
  try {
    const transactions = await Transaction.find({ userId });
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'deposit' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    if (amount > balance) {
      return res.status(400).send('Insufficient balance');
    }
    const newTransaction = new Transaction({ userId, type: 'withdrawal', amount });
    await newTransaction.save();
    res.status(201).send('Withdrawal successful');
  } catch (error) {
    res.status(500).send('Withdrawal failed');
  }
};

module.exports = { registerUser, loginUser, getUserDashboard, deposit, withdraw };
