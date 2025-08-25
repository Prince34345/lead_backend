require("dotenv/config.js");
const mongoose = require("mongoose");
const LeadModel = require("../models/leadsModel");
const UserModel = require("../models/AuthModel");

const sources = ["website", "facebook_ads", "google_ads", "referral", "events", "others"];
const statuses = ["new", "contacted", "qualified", "lost", "won"];
const cities = ["Delhi", "Mumbai", "Bengaluru", "Pune", "Chandigarh", "Gurugram", "Noida"];
const states = ["DL", "MH", "KA", "PB", "HR", "UP"];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const makeLead = (i, userId) => {
  const first = `User${i}`;
  const last = `Test${i}`;
  const email = `user${i}@example.com`;
  const phone = `9${randNum(100000000, 999999999)}`;
  return {
    first_name: first,
    last_name: last,
    email,
    phone,
    company: `Company ${randNum(1, 500)}`,
    city: rand(cities),
    state: rand(states),
    source: rand(sources),
    status: rand(statuses),
    score: randNum(0, 100),
    lead_value: randNum(1000, 100000),
    last_activity_at: Math.random() > 0.3 ? new Date(Date.now() - randNum(0, 60) * 86400000) : null,
    is_qualified: Math.random() > 0.5,
    created_by: userId
  };
};

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = await UserModel.findOne();
    if (!user) throw new Error("No user found. Seed at least one user before seeding leads.");

    await LeadModel.deleteMany({});
    const docs = Array.from({ length: 120 }, (_, i) => makeLead(i + 1, user._id));
    await LeadModel.insertMany(docs);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();