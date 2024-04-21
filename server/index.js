const express = require('express');
const mongoose = require('mongoose');
const stripe = require('stripe');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');

//routes
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const productsRouter = require('./routes/product');
const ordersRouter = require('./routes/order');
const cartRouter = require('./routes/cart');
const notificationRouter = require('./routes/notification');
const paymentRouter = require('./routes/payment');
const profileRouter = require('./routes/profile');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');
const wishlistRouter = require('./routes/wishlist');

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT;

// const mongodbConnect = require('./config/database');

// MongoDB Connection URL for a local instance
// Connection URI
const uri = process.env.DATABASE_URL;
const API_URL = process.env.API_URL;

mongoose
  .connect(uri)
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log('Error', err));

const adminAuthMiddlware = require('./middleware/adminAuth');
const authMiddlware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const corsOptions = {
  origin: 'http://localhost:2717',
  methods: 'GET, PUT, PATCH POST, DELETE',
  credentials: true,
  OptionSuccessStaus: 204,
};

// using cors middleware
app.use(cors(corsOptions));

// Middlewares
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public')); // For serving static files from public directory
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(express.json()); // For parsing application/json
app.use(errorHandler); // handles any foreseen error

app.get(`${API_URL}`, (req, res) => {
  res.send('Hello everyone!');
});

app.use(`${API_URL}/login`, loginRouter);

app.use(`${API_URL}/signup`, signupRouter);

app.use(`${API_URL}/products`, productsRouter);

app.use(`${API_URL}/orders`, ordersRouter);

app.use(`${API_URL}/cart`, cartRouter);

// app.use(`${API_URL}/notification`, notificationRouter);

// app.use(`${API_URL}/payment`, paymentRouter);

app.use(`${API_URL}/profile`, profileRouter);

// app.use(`${API_URL}/review`, reviewRouter);

app.use(`${API_URL}/user`, userRouter);

app.use(`${API_URL}/wishlist`, wishlistRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
