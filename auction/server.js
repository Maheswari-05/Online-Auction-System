const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// MongoDB Atlas connection
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  console.error('MONGODB_URL is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URL)
  .then(() => console.log('Connected to MongoDB Atlas successfully!'))
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1);
  });

// JWT Secret Key
const SECRET_KEY = process.env.SECRET_KEY || 'my_super_secret_123!';

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Auction Schema
const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  highestBidder: { type: String, default: '' },
  endDate: { type: Date, required: true },
  isClosed: { type: Boolean, default: false },
});

const Auction = mongoose.model('Auction', auctionSchema);

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Signin Route
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Signin successful', token });
  } catch (error) {
    console.error('Signin Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create Auction Route (Protected)
app.post('/auctions', authenticate, async (req, res) => {
  try {
    const { title, description, startingBid, endDate } = req.body;
    if (!title || !description || !startingBid || !endDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAuction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid,
      endDate: new Date(endDate),
    });

    await newAuction.save();
    res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
  } catch (error) {
    console.error('Create Auction Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get All Auctions Route
app.get('/auctions', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    console.error('Fetch Auctions Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get Single Auction Route
app.get('/auctions/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    res.json(auction);
  } catch (error) {
    console.error('Fetch Auction Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Place Bid Route (Protected)
app.post('/auctions/:id/bid', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { bidAmount } = req.body;
    const auction = await Auction.findById(id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    if (auction.isClosed) {
      return res.status(400).json({ message: 'Auction is closed' });
    }

    if (new Date() > new Date(auction.endDate)) {
      auction.isClosed = true;
      await auction.save();
      return res.json({ message: 'Auction closed', winner: auction.highestBidder });
    }

    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({ message: 'Bid must be higher than the current bid' });
    }

    auction.currentBid = bidAmount;
    auction.highestBidder = req.user.username;
    await auction.save();

    res.json({ message: 'Bid placed successfully', auction });
  } catch (error) {
    console.error('Place Bid Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});