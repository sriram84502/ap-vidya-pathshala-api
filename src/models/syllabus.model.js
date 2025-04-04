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
        required: true,
        min: 1
    },
    chapter_name: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    topics: [{
        type: String,
        required: true,
        trim: true
    }],
    learning_objectives: [{
        type: String,
        required: true,
        trim: true
    }],
    curriculum_type: {
        type: String,
        required: true,
        enum: ['AP', 'CBSE']
    }
}, {
    timestamps: true
});

// Create indexes for common queries
syllabusSchema.index({ grade: 1, semester: 1, subject: 1 });
syllabusSchema.index({ curriculum_type: 1 });

const Syllabus = mongoose.model('Syllabus', syllabusSchema);

module.exports = Syllabus; 