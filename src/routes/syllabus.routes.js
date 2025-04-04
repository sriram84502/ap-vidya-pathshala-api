const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabus.controller');

// Get all syllabus entries
router.get('/', syllabusController.getAllSyllabus);

// Get syllabus by grade
router.get('/grade/:grade', syllabusController.getSyllabusByGrade);

// Get syllabus by grade and semester
router.get('/grade/:grade/semester/:semester', syllabusController.getSyllabusByGradeAndSemester);

// Add new syllabus chapter
router.post('/', syllabusController.createSyllabus);

// Update syllabus chapter
router.put('/:id', syllabusController.updateSyllabus);

// Delete syllabus chapter
router.delete('/:id', syllabusController.deleteSyllabus);

module.exports = router; 