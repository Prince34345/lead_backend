const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createLead, getLeadById, getLeads, updateLeadById, deleteLeadbyId} = require("../controllers/leadsController")
const Lead_Routes = express.Router();


Lead_Routes.post("/leads" , authMiddleware , createLead);
Lead_Routes.get("/lead/:id" , authMiddleware , getLeadById);
Lead_Routes.put("/lead/:id" , authMiddleware , updateLeadById);
Lead_Routes.get("/leads" , authMiddleware , getLeads);
Lead_Routes.delete("/lead/:id", authMiddleware , deleteLeadbyId);


module.exports = Lead_Routes;