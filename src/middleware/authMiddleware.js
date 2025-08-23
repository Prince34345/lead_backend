const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({error: "Unauthorized"});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id, email: decoded.email}
        next();
    } catch (error) {
        return res.status(401).json({error: "Invalid or expires token"});
    }
};

module.exports = authMiddleware