const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  amount: Number,
  stripeId: String,
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  platformCut: { type: Number, default: 0.5 } // 50%
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

