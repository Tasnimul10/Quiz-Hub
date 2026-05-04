const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true }, // percentage
  correctAnswers: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);

