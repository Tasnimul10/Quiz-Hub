const express = require('express');
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Score = require('../models/Score');
const { auth, roleAuth } = require('../middleware/auth');
const router = express.Router();

// Student dashboard
router.get('/student', auth, roleAuth(['student']), async (req, res) => {
  try {
    const scores = await Score.find({ student: req.user._id }).populate('quiz');
    const avgScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length || 0;
    res.json({
      totalQuizzes: scores.length,
      avgScore,
      bestScore: Math.max(...scores.map(s => s.score), 0),
      scores
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Teacher dashboard
router.get('/teacher', auth, roleAuth(['teacher']), async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacher: req.user._id }).populate('attempts');
    let totalAttempts = 0, avgScore = 0;
    quizzes.forEach(q => {
      totalAttempts += q.attempts.length;
      // avg per quiz etc.
    });
    res.json({ quizzes, totalAttempts, earnings: req.user.balance });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Admin dashboard
router.get('/admin', auth, roleAuth(['admin']), async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['student', 'teacher'] } });
    const totalQuizzes = await Quiz.countDocuments();
    const totalScores = await Score.countDocuments();
    res.json({ users, totalQuizzes, totalScores });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

