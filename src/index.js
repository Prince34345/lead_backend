const express = require('express');
const connectDB = require('./db');
const Lead_Routes = require('./routes/leadRoutes');
require('dotenv').config();
const app = express();

connectDB();
app.use("/", Lead_Routes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
