const express = require('express');
const Routes = require('../backend/routes/user.route');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

connectDB();

app.use('/', Routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
