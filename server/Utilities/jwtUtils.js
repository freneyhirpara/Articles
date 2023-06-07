import jwt from 'jsonwebtoken';
import User from '../models/User';

const ensureToken = async (token) => {
  const bearerHeader = token;
  if (bearerHeader !== undefined) {
    try {
      const token = bearerHeader.split(' ')[1];
      const decoded = jwt.verify(token, 'mysecretkey');
      if (await User.findById(decoded.id)) {
        return decoded.id;
      } else {
        throw new Error('User does not exists');
      }
    } catch (err) {
      throw new Error('Invalid Token');
    }
  } else {
    throw new Error('No Bearer Token found');
  }
};

const generateToken = (payload) => {
  const userInfo = {
    id: payload._id,
    email: payload.email,
    password: payload.password,
  };
  const token = jwt.sign(userInfo, 'mysecretkey', {
    expiresIn: '4h',
  });
  return token;
};

module.exports = {
  ensureToken,
  generateToken,
};
