const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
let cachedDb = null;
const connectToDatabase = async () => {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        cachedDb = db;
        console.log('New database connection established');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Database connection middleware
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        next(error);
    }
});

// Swagger documentation
try {
    const swaggerDocument = require('./swagger.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
    console.warn('Swagger documentation not available:', error.message);
    app.get('/api-docs', (req, res) => {
        res.status(404).json({
            message: 'API documentation not available',
            error: 'Swagger configuration missing'
        });
    });
}

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'AP Vidya Pathshala API',
        version: '1.0.0',
        endpoints: {
            documentation: '/api-docs',
            health: '/api/health',
            auth: {
                student: '/api/login/student',
                teacher: '/api/login/teacher',
                headmaster: '/api/login/headmaster',
                admin: '/api/login/admin'
            },
            syllabus: {
                all: '/api/syllabus',
                byGrade: '/api/syllabus/grade/:grade',
                byGradeAndSemester: '/api/syllabus/grade/:grade/semester/:semester'
            }
        }
    });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        const dbConnection = await connectToDatabase();
        res.status(200).json({ 
            status: 'OK', 
            message: 'API is running',
            mongodb: dbConnection.connection.readyState === 1 ? 'Connected' : 'Disconnected'
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'Error', 
            message: 'Database connection failed',
            error: error.message
        });
    }
});

// Routes
const authRoutes = require('./routes/auth.routes');
const syllabusRoutes = require('./routes/syllabus.routes');

app.use('/api/login', authRoutes);
app.use('/api/syllabus', syllabusRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        message: 'Something went wrong!', 
        error: err.message
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        requested_url: req.originalUrl
    });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app; 