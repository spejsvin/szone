import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  afk: { type: Boolean, default: false },
  afkReason: String,
  afkTime: Date,
  oldNickname: String
});

export const User = mongoose.model('User', userSchema);

