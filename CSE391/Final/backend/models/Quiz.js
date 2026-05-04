const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{
    question: String,
    type: { type: String, enum: ['mcq', 'short', 'tf'] },
    options: [String], // For MCQ/TF
    answer: String,
    explanation: String
  }],
  maxQuestions: { type: Number, default: 10 },
  price: { type: Number, default: 0 }, // 0 for free
  isPaid: { type: Boolean, default: false },
  attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);

