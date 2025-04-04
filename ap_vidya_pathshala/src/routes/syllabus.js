const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Syllabus = require('../models/Syllabus');

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * @swagger
 * /api/syllabus:
 *   get:
 *     summary: Get all syllabus entries
 *     tags: [Syllabus]
 *     responses:
 *       200:
 *         description: List of all syllabus chapters
 */
router.get('/', async (req, res) => {
  try {
    const chapters = await Syllabus.find().sort({ grade: 1, semester: 1, chapter_number: 1 });
    res.json(chapters);
  } catch (err) {
    console.error('Error fetching syllabus:', err);
    res.status(500).json({ message: 'Error fetching syllabus entries', error: err.message });
  }
});

/**
 * @swagger
 * /api/syllabus/grade/{grade}:
 *   get:
 *     summary: Get syllabus by grade
 *     tags: [Syllabus]
 *     parameters:
 *       - in: path
 *         name: grade
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['6', '7', '8', '9', '10']
 *     responses:
 *       200:
 *         description: List of syllabus chapters for the specified grade
 */
router.get('/grade/:grade', 
  param('grade').isIn(['6', '7', '8', '9', '10']),
  validateRequest,
  async (req, res) => {
    try {
      const chapters = await Syllabus.find({ grade: req.params.grade })
        .sort({ semester: 1, chapter_number: 1 });
      res.json(chapters);
    } catch (err) {
      console.error('Error fetching grade syllabus:', err);
      res.status(500).json({ message: 'Error fetching grade syllabus', error: err.message });
    }
});

/**
 * @swagger
 * /api/syllabus/grade/{grade}/semester/{semester}:
 *   get:
 *     summary: Get syllabus by grade and semester
 *     tags: [Syllabus]
 *     parameters:
 *       - in: path
 *         name: grade
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['6', '7', '8', '9', '10']
 *       - in: path
 *         name: semester
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['1', '2']
 *     responses:
 *       200:
 *         description: List of syllabus chapters for the specified grade and semester
 */
router.get('/grade/:grade/semester/:semester',
  [
    param('grade').isIn(['6', '7', '8', '9', '10']),
    param('semester').isIn(['1', '2'])
  ],
  validateRequest,
  async (req, res) => {
    try {
      const chapters = await Syllabus.find({
        grade: req.params.grade,
        semester: req.params.semester
      }).sort({ chapter_number: 1 });
      res.json(chapters);
    } catch (err) {
      console.error('Error fetching semester syllabus:', err);
      res.status(500).json({ message: 'Error fetching semester syllabus', error: err.message });
    }
});

/**
 * @swagger
 * /api/syllabus:
 *   post:
 *     summary: Add a new syllabus chapter
 *     tags: [Syllabus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - grade
 *               - semester
 *               - chapter_number
 *               - chapter_name
 *               - subject
 *               - topics
 *               - learning_objectives
 *               - curriculum_type
 *             properties:
 *               grade:
 *                 type: string
 *                 enum: ['6', '7', '8', '9', '10']
 *               semester:
 *                 type: string
 *                 enum: ['1', '2']
 *               chapter_number:
 *                 type: integer
 *               chapter_name:
 *                 type: string
 *               subject:
 *                 type: string
 *               topics:
 *                 type: array
 *                 items:
 *                   type: string
 *               learning_objectives:
 *                 type: array
 *                 items:
 *                   type: string
 *               curriculum_type:
 *                 type: string
 *                 enum: ['AP', 'CBSE']
 *     responses:
 *       201:
 *         description: Created syllabus chapter
 */
router.post('/',
  [
    body('grade').isIn(['6', '7', '8', '9', '10']),
    body('semester').isIn(['1', '2']),
    body('chapter_number').isInt({ min: 1 }),
    body('chapter_name').notEmpty(),
    body('subject').notEmpty(),
    body('topics').isArray({ min: 1 }),
    body('learning_objectives').isArray({ min: 1 }),
    body('curriculum_type').isIn(['AP', 'CBSE'])
  ],
  validateRequest,
  async (req, res) => {
    try {
      const chapter = new Syllabus(req.body);
      const newChapter = await chapter.save();
      res.status(201).json(newChapter);
    } catch (err) {
      console.error('Error creating syllabus chapter:', err);
      res.status(400).json({ message: 'Error creating syllabus chapter', error: err.message });
    }
});

/**
 * @swagger
 * /api/syllabus/{id}:
 *   put:
 *     summary: Update a syllabus chapter
 *     tags: [Syllabus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Syllabus'
 *     responses:
 *       200:
 *         description: Updated syllabus chapter
 */
router.put('/:id',
  [
    body('grade').isIn(['6', '7', '8', '9', '10']),
    body('semester').isIn(['1', '2']),
    body('chapter_number').isInt({ min: 1 }),
    body('chapter_name').notEmpty(),
    body('subject').notEmpty(),
    body('topics').isArray({ min: 1 }),
    body('learning_objectives').isArray({ min: 1 }),
    body('curriculum_type').isIn(['AP', 'CBSE'])
  ],
  validateRequest,
  async (req, res) => {
    try {
      const chapter = await Syllabus.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
      }
      res.json(chapter);
    } catch (err) {
      console.error('Error updating syllabus chapter:', err);
      res.status(400).json({ message: 'Error updating syllabus chapter', error: err.message });
    }
});

/**
 * @swagger
 * /api/syllabus/{id}:
 *   delete:
 *     summary: Delete a syllabus chapter
 *     tags: [Syllabus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chapter deleted successfully
 */
router.delete('/:id', async (req, res) => {
  try {
    const chapter = await Syllabus.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.json({ message: 'Chapter deleted successfully' });
  } catch (err) {
    console.error('Error deleting syllabus chapter:', err);
    res.status(500).json({ message: 'Error deleting syllabus chapter', error: err.message });
  }
});

module.exports = router; 