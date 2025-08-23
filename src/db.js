const mongoose = require("mongoose");


const connectDB = async () => {
    try {
       mongoose.set("strictQuery", true);
       await mongoose.connect(process.env.DATABASE_URL);
       console.log("db.js is connected, success");
    } catch (error) {
        console.log(`db.js throwing error, ${error.message}`);
    }
}

module.exports = connectDB;