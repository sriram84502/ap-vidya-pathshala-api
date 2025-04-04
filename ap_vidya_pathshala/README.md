# AP Vidya Pathshala API

A comprehensive digital learning platform API for students following the Andhra Pradesh State Government curriculum from 6th to 10th standard, with CBSE curriculum support.

## Features

- Curriculum management (AP and CBSE)
- Grade-specific content (6th to 10th standard)
- Semester-wise organization
- Subject-wise chapter management
- Learning objectives tracking
- Topic-wise content organization

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ap-vidya-pathshala
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` file

4. Start MongoDB:
```bash
mongod
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start at http://localhost:5001

## API Documentation

Swagger documentation is available at http://localhost:5001/api-docs

### Available Endpoints

#### Syllabus Management
- GET /api/syllabus - Get all syllabus entries
- GET /api/syllabus/grade/:grade - Get syllabus by grade
- GET /api/syllabus/grade/:grade/semester/:semester - Get syllabus by grade and semester
- POST /api/syllabus - Add new syllabus chapter
- PUT /api/syllabus/:id - Update syllabus chapter
- DELETE /api/syllabus/:id - Delete syllabus chapter

## Example API Usage

### Adding a new syllabus chapter
```bash
curl -X POST http://localhost:5001/api/syllabus \
  -H "Content-Type: application/json" \
  -d '{
    "grade": "6",
    "semester": "1",
    "chapter_number": 1,
    "chapter_name": "Introduction to Algebra",
    "subject": "Mathematics",
    "topics": ["Variables", "Constants", "Expressions"],
    "learning_objectives": [
      "Understand basic algebraic concepts",
      "Solve simple equations"
    ],
    "curriculum_type": "AP"
  }'
```

## Database Schema

### Syllabus Collection
```json
{
  "_id": ObjectId,
  "grade": string,          // "6" to "10"
  "semester": string,       // "1" or "2"
  "chapter_number": number,
  "chapter_name": string,
  "subject": string,
  "topics": string[],
  "learning_objectives": string[],
  "curriculum_type": string, // "AP" or "CBSE"
  "createdAt": Date,
  "updatedAt": Date
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 