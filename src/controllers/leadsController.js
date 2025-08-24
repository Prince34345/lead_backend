const LeadModel = require("../models/leadsModel");
const buildLeadFilters = require("../utils/parsefilters");

const getLeadById = async (req, res) => {
   try {
      const lead = await LeadModel.findById(req.params.id);
      if (!lead) return res.status(400).json({error: "Lead not found."});
      return res.json(lead);
   } catch (error) {
      return res.status(500).json({error: error.message});
   }
} 
const getLeads = async (req, res) => {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const filter = buildLeadFilters(req.query);
   try {
       const [data, total] = await Promise.all([LeadModel.find(filter).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit), LeadModel.countDocuments(filter)])
       return res.json({data, page, limit, total, totalPages: Math.ceil(total / limit) || 1})
   } catch (error) {
       res.status(500).json({error: error.message});
   }
} 

const createLead = async (req, res) => {
     try {
        if (req.body) {
            const response = await LeadModel.create(req.body);
            res.status(201).json(response);
        }
     } catch (error) {
        res.status(400).json({err: error.message});
     }
} 
const updateLeadById = async (req, res) => {
  try {
    const lead = await LeadModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    return res.json(lead);
} catch (error) {
    return res.status(400).json({ error: error.message });
  }
} 
const deleteLeadbyId = async (req, res) => {
    try {
    const lead = await LeadModel.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    return res.json({ message: "Lead deleted" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
} 

module.exports = {getLeadById, getLeads, createLead, updateLeadById, deleteLeadbyId};

