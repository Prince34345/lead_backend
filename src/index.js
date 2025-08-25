const express = require('express');
const connectDB = require('./db');
const Lead_Routes = require('./routes/leadRoutes');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Auth_Routes = require('./routes/AuthRoutes');
require('dotenv').config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({message: "Backend Server Connected"})
})
app.use("/app",Lead_Routes);
app.use("/auth", Auth_Routes);

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
