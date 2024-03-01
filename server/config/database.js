const mongoose = require('mongoose');

// Connect to MongoDB
const mongodbConnect = mongoose
  .connect(uri)
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log('Error', err));

module.exports = { mongodbConnect };
