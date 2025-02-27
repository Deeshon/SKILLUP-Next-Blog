import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) return res.status(401).json({
    success: false,
    result: {
      response: 'Unauthorized.'
    }
  })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({
      success: false,
      result: {
        response: 'Forbidden'
      }
    })
    req.user = user;
    next();
  })}