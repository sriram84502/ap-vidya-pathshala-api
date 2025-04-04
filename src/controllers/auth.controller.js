const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// Student login
exports.studentLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find student by username
        const student = await User.findOne({ username, role: 'student' });
        if (!student) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, student.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: student._id, role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: `Student ${username} logged in successfully`,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

// Teacher login
exports.teacherLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find teacher by username
        const teacher = await User.findOne({ username, role: 'teacher' });
        if (!teacher) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, teacher.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: teacher._id, role: 'teacher' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: `Teacher ${username} logged in successfully`,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

// Headmaster login
exports.headmasterLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find headmaster by username
        const headmaster = await User.findOne({ username, role: 'headmaster' });
        if (!headmaster) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, headmaster.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: headmaster._id, role: 'headmaster' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: `Headmaster ${username} logged in successfully`,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

// Admin login
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by username
        const admin = await User.findOne({ username, role: 'admin' });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: admin._id, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: `Admin ${username} logged in successfully`,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
}; 