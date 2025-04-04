# AP Vidya Pathshala API

A digital learning platform API for AP Vidya Pathshala, built with Node.js, Express, and MongoDB.

## Features

- Role-based authentication (Student, Teacher, Headmaster, Admin)
- JWT-based authentication
- MongoDB integration
- Swagger API documentation
- Error handling middleware
- Secure password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sriram84502/ap-vidya-pathshala-api.git
cd ap-vidya-pathshala-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

4. Start the server:
```bash
npm run dev
```

## API Documentation

The API documentation is available at `http://localhost:5001/api-docs` when the server is running.

### Authentication Endpoints

#### Student Login
- **POST** `/api/login/student`
- Request body:
```json
{
  "username": "student001",
  "password": "yourpassword"
}
```

#### Teacher Login
- **POST** `/api/login/teacher`
- Request body:
```json
{
  "username": "teacher001",
  "password": "yourpassword"
}
```

#### Headmaster Login
- **POST** `/api/login/headmaster`
- Request body:
```json
{
  "username": "hm001",
  "password": "yourpassword"
}
```

#### Admin Login
- **POST** `/api/login/admin`
- Request body:
```json
{
  "username": "admin001",
  "password": "yourpassword"
}
```

## Project Structure

```
ap-vidya-pathshala/
├── src/
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── auth.routes.js
│   ├── app.js
│   └── swagger.json
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 