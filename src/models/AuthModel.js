const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({fullname: {type: String, required: true, trim: true}, username: {required: true, unique:true, type: String}, email: {type: String, unique: true, required: true}, password: {type: String, minLength: 6, required: true}})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = function (candidate) {
     return bcrypt.compare(candidate, this.password)
}

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;