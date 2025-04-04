const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
    enum: ['6', '7', '8', '9', '10']
  },
  semester: {
    type: String,
    required: true,
    enum: ['1', '2']
  },
  chapter_number: {
    type: Number,
    required: true
  },
  chapter_name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  topics: [{
    type: String,
    required: true
  }],
  learning_objectives: [{
    type: String,
    required: true
  }],
  curriculum_type: {
    type: String,
    required: true,
    enum: ['AP', 'CBSE']
  }
}, {
  timestamps: true
});

// Create compound index for grade and semester
syllabusSchema.index({ grade: 1, semester: 1 });

module.exports = mongoose.model('Syllabus', syllabusSchema); 