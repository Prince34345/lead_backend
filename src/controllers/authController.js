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

    } catch (error) {
        
    }
}
const logout = (req, res) => {
    
}
const myProfile = (req, res) => {
    
}

module.exports = {postUser, getUsers, getUserById, updateUserById, deleteUserbyId}
