// models/user.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true },
});

export default model('User', userSchema);
