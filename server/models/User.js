const mongoose = require('mongoose');
import findOrCreate from 'mongoose-findorcreate';
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    profession: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

usersSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', usersSchema);
