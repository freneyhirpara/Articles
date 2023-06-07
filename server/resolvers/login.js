import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../Utilities/jwtUtils';
import CommonResponse from '../helpers/index';

module.exports = async ({ email, password }) => {
  try {
    if (!email && !password) {
      throw new Error('Username and Password are required!');
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('Username or Password is incorrect!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Username or Password is incorrect!');
    }
    const token = generateToken(user);
    const loginData = {
      userId: user.id,
      token: token,
      tokenExpiration: 4,
    };
    return CommonResponse('SUCCESS', loginData, null);
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
