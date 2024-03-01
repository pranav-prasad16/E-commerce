const express = require('express');
const mongoose = require('mongoose');
const stripe = require('stripe');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');

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

const corsOptions = {
  origin: 'http://localhost:2717',
  methods: 'GET, PUT, PATCH POST, DELETE',
  credentials: true,
  OptionSuccessStaus: 204,
};

// using cors middleware
app.use(cors(corsOptions));

const adminAuthMiddlware = require('./middleware/adminAuth');
const authMiddlware = require('./middleware/auth');

// const mongodbConnect = require('./config/database');

// MongoDB Connection URL for a local instance
// Connection URI
const uri = process.env.DATABASE_URL;

mongoose
  .connect(uri)
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log('Error', err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files from public directory
app.use(express.json()); // For parsing application/json

app.get('/', (req, res) => {
  res.send('Hello everyone!');
});

app.use('/api/login', loginRouter);

app.use('/api/signup', signupRouter);

app.use('/api/products', productsRouter);

app.use('/api/orders', ordersRouter);

app.use('/api/cart', cartRouter);

app.use('/api/notification', notificationRouter);

// app.use('/api/payment', paymentRouter);

app.use('/api/profile', profileRouter);

app.use('/api/review', reviewRouter);

app.use('/api/user', userRouter);

app.use('/api/wishlist', wishlistRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
