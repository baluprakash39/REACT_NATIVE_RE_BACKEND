const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

// require('dotenv').config();

// Generate a random secret key
// const secret_Key = crypto.randomBytes(32).toString('hex');
// console.log(secret_Key);

const secretKey = 'cgvhbxdfcvgvvgcfvb';

  function generateToken(phoneNumber) {
    return jwt.sign({ phoneNumber }, secretKey, { expiresIn: '15min' }); // You can adjust the expiration time
  }

// Verify a JWT token
function verifyToken(req, res, next) {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Extract the token part
  const token = tokenHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    console.log("Token:",token);
    console.log("Secret key:",secretKey);
    console.log("Decoded:",decoded);

    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.phoneNumber = decoded;
    next();
  });
}



function generateRefreshToken(phoneNumber) {
    return jwt.sign({ phoneNumber }, secretKey, { expiresIn: '1hr' }); // Use the same secret key
  }

// Handle token refresh
function refreshToken(req, res) {
    const refreshToken = req.body.refreshToken;
    
  
    // Verify the refresh token
    jwt.verify(refreshToken, secretKey, (err, decoded) => {
        console.log("Refresh token:",refreshToken);
        console.log("Secret key:",secretKey);
        console.log("Decoded:",decoded);
      if (err) {
        console.error('Refresh token verification error:', err);
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      // Generate a new access token
      const newAccessToken = generateToken(decoded.phoneNumber);
  
      // Send the new access token to the client
      res.json({ accessToken: newAccessToken });
    });
  }
  
  module.exports = { generateToken, verifyToken, refreshToken, generateRefreshToken };