const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const Lead_Routes = express.Router();


Lead_Routes.post("/leads" , /*  add middleware after creating user routes.  ,*/postLead);
Lead_Routes.get("/lead/:id" , /*  add middleware after creating user routes.  ,*/ getLeadById);
Lead_Routes.put("/lead/:id" , /*  add middleware after creating user routes.  ,*/ updateLeadById);
Lead_Routes.get("/leads" , /*  add middleware after creating user routes.  ,*/ getLeads);
Lead_Routes.delete("/lead/:id", /*  add middleware after creating user routes.  ,*/ deleteLeadbyId)


module.exports = Lead_Routes;