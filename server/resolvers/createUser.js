import User from '../models/User';
import CommonResponse from '../helpers/index';
import bcrypt from 'bcryptjs';

module.exports = async ({
  firstName,
  lastName,
  profession,
  email,
  password,
}) => {
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error('User exists already.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let user = new User({
      firstName,
      lastName,
      profession,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    const userData = {
      ...result.doc,
      password: null,
    };
    return CommonResponse('SUCCESS', userData, null);
  } catch (error) {
    return CommonResponse('ERROR', null, error.message);
  }
};
