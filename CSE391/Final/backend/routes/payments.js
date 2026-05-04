const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const { auth, roleAuth } = require('../middleware/auth');
const router = express.Router();

// Create payment intent for paid quiz
router.post('/create-intent', auth, roleAuth(['student']), async (req, res) => {
  try {
    const { quizId } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz || !quiz.isPaid) return res.status(400).json({ msg: 'Not paid quiz' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: quiz.price * 100, // cents
      currency: 'usd',
      metadata: { quizId: quiz._id.toString(), studentId: req.user._id.toString() }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Webhook for payment success (simplified)
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    // Verify webhook signature (placeholder)
    event = req.body;
  } catch (err) {
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const quizId = paymentIntent.metadata.quizId;
    const studentId = paymentIntent.metadata.studentId;
    const amount = paymentIntent.amount / 100;

    // 50/50 split
    const teacherCut = amount * 0.5;
    const platformCut = amount * 0.5;

    // Update teacher balance (find teacher from quiz)
    const quiz = await Quiz.findById(quizId);
    await User.findByIdAndUpdate(quiz.teacher, { $inc: { balance: teacherCut } });

    const payment = new Payment({ student: studentId, teacher: quiz.teacher, quiz: quizId, amount, stripeId: paymentIntent.id, status: 'completed' });
    await payment.save();
  }

  res.json({ received: true });
});

module.exports = router;

