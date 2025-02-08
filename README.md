# Jarvice

## Overview
This project is a full-stack application that allows users to configure a chatbot and generate QR codes for easy access. It consists of a frontend built with React and a backend powered by Express and MongoDB.

## Installation

### Prerequisites
- Node.js
- MongoDB

### Clone the repository
```bash
git clone <repository-url>
cd Jarvice
```

### Install dependencies
```bash
npm install
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/botdb
JWT_SECRET=your_jwt_secret_key_here
```

## Usage
To run the application, use the following commands:
```bash
# Start the backend server
cd backend
npm run dev

# Start the frontend server
cd ..
npm run dev
```

## API Endpoints
- **POST /auth/register**: Register a new user
- **POST /auth/login**: Log in an existing user
- **POST /bot/configure**: Configure the chatbot (requires authentication)
- **GET /qr/generate**: Generate a QR code (requires authentication)

## Contributing
Contributions are welcome! Please create a pull request or open an issue.

## License
This project is licensed under the MIT License.
