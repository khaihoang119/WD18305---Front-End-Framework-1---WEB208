const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  assignee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  status: { type: String, required: true },
  priority: { type: String, required: true },
  due_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
