import jwt from 'jsonwebtoken';
import  User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      //console.log(token);

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the user to the request
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (err) {
      //console.error(err);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;
