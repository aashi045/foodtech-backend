const jwt = require('jsonwebtoken');
require('dotenv').config();

// Payload for the token (you can customize)
const payload = {
  id: 1,           // Example user ID
  name: 'Test User',
  email: 'test@example.com',
  role: 'customer'
};

// Options
const options = {
  expiresIn: process.env.JWT_EXPIRES_IN || '7d' // token expiry
};

// Generate token
const token = jwt.sign(payload, process.env.JWT_SECRET, options);

console.log('Your JWT token:');
console.log(token);
