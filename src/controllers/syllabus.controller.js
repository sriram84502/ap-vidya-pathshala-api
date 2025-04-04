const Syllabus = require('../models/syllabus.model');

// Get all syllabus entries
exports.getAllSyllabus = async (req, res) => {
    try {
        const syllabus = await Syllabus.find();
        res.status(200).json(syllabus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get syllabus by grade
exports.getSyllabusByGrade = async (req, res) => {
    try {
        const syllabus = await Syllabus.find({ grade: req.params.grade });
        if (syllabus.length === 0) {
            return res.status(404).json({ message: 'No syllabus found for this grade' });
        }
        res.status(200).json(syllabus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get syllabus by grade and semester
exports.getSyllabusByGradeAndSemester = async (req, res) => {
    try {
        const syllabus = await Syllabus.find({
            grade: req.params.grade,
            semester: req.params.semester
        });
        if (syllabus.length === 0) {
            return res.status(404).json({ 
                message: 'No syllabus found for this grade and semester' 
            });
        }
        res.status(200).json(syllabus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new syllabus chapter
exports.createSyllabus = async (req, res) => {
    try {
        const newSyllabus = new Syllabus(req.body);
        const savedSyllabus = await newSyllabus.save();
        res.status(201).json(savedSyllabus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update syllabus chapter
exports.updateSyllabus = async (req, res) => {
    try {
        const updatedSyllabus = await Syllabus.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedSyllabus) {
            return res.status(404).json({ message: 'Syllabus chapter not found' });
        }
        res.status(200).json(updatedSyllabus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete syllabus chapter
exports.deleteSyllabus = async (req, res) => {
    try {
        const deletedSyllabus = await Syllabus.findByIdAndDelete(req.params.id);
        if (!deletedSyllabus) {
            return res.status(404).json({ message: 'Syllabus chapter not found' });
        }
        res.status(200).json({ message: 'Syllabus chapter deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 