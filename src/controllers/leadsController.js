const LeadModel = require("../models/leadsModel");

const getLeadById = (req, res) => {
 
} 
const getLeads = async (req, res) => {
   try {
       const {page = 1, limit = 10, email} = req.query;
       const response = await LeadModel.find({
        $where: {
            email
        }
       }).skip((page - 1) * limit).limit(Number(limit));
       res.status(201).json(response);
   } catch (error) {
       res.status(400).json({error: error.message});
   }
} 

const postLead = async (req, res) => {
     try {
        if (req.body) {
            const response = await LeadModel.create(req.body);
            res.status(201).json(response);
        }
     } catch (error) {
        res.status(400).json({err: error.message});
     }
} 
const updateLeadById = (req, res) => {

} 
const deleteLeadbyId = (req, res) => {

} 

module.exports = {getLeadById, getLeads, postLead, updateLeadById, deleteLeadbyId};

