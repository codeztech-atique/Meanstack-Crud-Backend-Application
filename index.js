// Local development server (use `npm run dev` or `npm start`)
const app = require('./app.js');
const { connectDB } = require('./db.js');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server connected to port: ${PORT}`));
  })
  .catch((err) => {
    console.error('Error in DB connection:', err);
    process.exit(1);
  });
