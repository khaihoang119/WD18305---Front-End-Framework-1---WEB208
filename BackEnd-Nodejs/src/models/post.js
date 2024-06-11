const mongoose = require('mongoose');
const { start } = require('repl');

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  leader_id: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  budget: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('project', postSchema);