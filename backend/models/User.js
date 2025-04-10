import mongoose from 'mongoose';
import  bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Make password optional
  isVerified: { type: Boolean, default: false },
  authType: { type: String, enum: ["email", "google"], required: true },
  googleId: { type: String },
});

// Hash the password before saving the user
/* userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  
  next();
}); */

// Compare password method for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
