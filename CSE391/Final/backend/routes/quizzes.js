const express = require('express');
const Quiz = require('../models/Quiz');
const Score = require('../models/Score');
const { auth, roleAuth } = require('../middleware/auth');
const router = express.Router();

// Get all quizzes (students see, teachers manage)
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('teacher', 'name').limit(20);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create quiz (teacher only)
router.post('/', auth, roleAuth(['teacher', 'admin']), async (req, res) => {
  try {
    const quiz = new Quiz({ ...req.body, teacher: req.user._id });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Take quiz (student), submit answers
router.post('/:id/score', auth, roleAuth(['student']), async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

    // Simple scoring logic (implement based on question type)
    const score = calculateScore(quiz.questions, req.body.answers); // Placeholder func
    const newScore = new Score({ student: req.user._id, quiz: quiz._id, score, correctAnswers: score.correct });
    await newScore.save();

    res.json(newScore);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Teacher get own quizzes analytics
router.get('/my', auth, roleAuth(['teacher']), async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacher: req.user._id }).populate('attempts');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

function calculateScore(questions, answers) {
  let correct = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correct++;
  });
  return { score: (correct / questions.length) * 100, correct };
}

module.exports = router;

