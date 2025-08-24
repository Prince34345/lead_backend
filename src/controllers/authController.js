const setCookie = require("../cookie");
const UserModel = require("../models/AuthModel");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
     try {
        const user = new UserModel(req.body);
        await user.save();
        return res.status(201).json({message: "User Registrated"})
     } catch (error) {
        return res.status(400).json({error: e.message}); 
     }
}
const login = async (req, res) => {
    const {email, password} = req.body;
    const errMsg = 'Invalid credentials';
    try {
        const user = await UserModel.findOne({email});
        if (!user) return res.status(401).json({error: errMsg});
        
        const ok = await user.comparePassword(password);
        if (!ok) return res.status(401).json({error: errMsg});
        
        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "5d"})

        setCookie(res, token);
        return res.json({message: "Logged In"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
const logout = (req, res) => {
     res.clearCookie("token", {httpOnly: true, sameSite: "none", secure: true});
     return res.json({message: "Logged Out"});
}
const myProfile  = async (req, res) => {
    const token = req.cookies?.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id).select("-password");
        return res.json({user});
    } catch (error) {
        return res.status(200).json({user: null});
    }   
}

module.exports = {registerUser, login, logout, myProfile}
