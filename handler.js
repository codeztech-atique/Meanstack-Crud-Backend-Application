const serverless = require('serverless-http');

const app = require('./app.js');
const { connectDB } = require('./db.js');

const serverlessHandler = serverless(app);

module.exports.api = async (event, context) => {
  // Reuse the MongoDB connection across warm invocations
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  return serverlessHandler(event, context);
};
