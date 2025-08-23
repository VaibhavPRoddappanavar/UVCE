# UVCE Art Marketplace Backend API

A simple Express.js backend with MongoDB for authentication and user management, designed to be deployed on Vercel.

## Features

- **User Authentication**: JWT-based authentication
- **Multiple User Types**: Support for regular users, artists, and businesses
- **MongoDB Integration**: Using Mongoose ODM
- **Vercel Compatible**: Ready for serverless deployment
- **Password Security**: Bcrypt hashing
- **Input Validation**: Email validation and data sanitization

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User

- **POST** `/api/auth/register`
- **Body**:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "userType": "user|artist|business",
  "name": "Full Name",
  "phone": "1234567890",
  "artistInfo": {
    "bio": "Artist bio",
    "specialization": ["Madhubani", "Warli"],
    "experience": 5,
    "location": {
      "state": "Karnataka",
      "city": "Bangalore"
    },
    "portfolio": ["url1", "url2"]
  },
  "businessInfo": {
    "companyName": "Company Name",
    "businessType": "textile",
    "description": "Company description",
    "website": "https://company.com",
    "location": {
      "state": "Karnataka",
      "city": "Bangalore",
      "address": "Full address"
    }
  }
}
```

#### Login User

- **POST** `/api/auth/login`
- **Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile (Protected)

- **GET** `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`

#### Update Profile (Protected)

- **PUT** `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Same as register but only fields to update

### User Routes (`/api/users`)

#### Get All Artists

- **GET** `/api/users/artists`

#### Get All Businesses

- **GET** `/api/users/businesses`

#### Get Artist by ID

- **GET** `/api/users/artist/:id`

## User Types

### 1. Regular User (`user`)

- Basic profile with name and phone
- Can browse and purchase art

### 2. Artist (`artist`)

- Extended profile with bio, specialization, experience
- Location and portfolio information
- Can upload and sell artwork

### 3. Business (`business`)

- Company information and business type
- Can purchase art for commercial use
- Partnership opportunities

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "message": "Response message",
  "data": {
    // Response data
  },
  "errors": [
    // Validation errors (if any)
  ]
}
```

## Error Handling

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid/missing token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Internal Server Error

## Security Features

- Password hashing with bcrypt
- JWT token expiration (7 days)
- Email validation
- User input sanitization
- CORS protection

## Database Schema

### User Model

```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  userType: String (enum: ['user', 'artist', 'business']),
  profile: {
    name: String (required),
    phone: String,
    artistInfo: {
      bio: String,
      specialization: [String],
      experience: Number,
      location: { state: String, city: String },
      portfolio: [String]
    },
    businessInfo: {
      companyName: String,
      businessType: String,
      description: String,
      website: String,
      location: { state: String, city: String, address: String }
    }
  },
  isVerified: Boolean,
  isActive: Boolean,
  timestamps: true
}
```
