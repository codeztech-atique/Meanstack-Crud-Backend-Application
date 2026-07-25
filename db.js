const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://atique:atique@cluster0.dgfcd.mongodb.net/firstdb?retryWrites=true&w=majority';

// Cache the connection across Lambda invocations (warm starts reuse the container)
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  cachedConnection = await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log('MongoDB connected...');
  return cachedConnection;
}

module.exports = { connectDB };
