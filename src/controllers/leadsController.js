const LeadModel = require("../models/leadsModel");
const buildLeadFilters = require("../utils/parsefilters");

const getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const filter = buildLeadFilters(req.query);

    const leads = await LeadModel.find({ created_by: req.user._id, ...filter })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await LeadModel.countDocuments({ created_by: req.user._id, ...filter });

    res.json({ data: leads, total });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await LeadModel.findOne({ _id: req.params.id, created_by: req.user._id });
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lead" });
  }
};

const createLead = async (req, res) => {
  try {
    const lead = await LeadModel.create({ ...req.body, created_by: req.user._id });
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: "Failed to create lead" });
  }
};

const updateLeadById = async (req, res) => {
  try {
    const lead = await LeadModel.findOneAndUpdate(
      { _id: req.params.id, created_by: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ error: "Failed to update lead" });
  }
};

const deleteLeadById = async (req, res) => {
  try {
    const lead = await LeadModel.findOneAndDelete({ _id: req.params.id, created_by: req.user._id });
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete lead" });
  }
};


module.exports = {getLeadById, getLeads, createLead, updateLeadById, deleteLeadById};

