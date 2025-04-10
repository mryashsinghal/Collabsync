import User from '../models/User.js';
import Profile from '../models/Profile.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";
import { response } from 'express';

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    let userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.authType === "google") {
        return res.status(400).json({
          message: "This email is already registered via Google. Please log in with Google.",
        });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    let salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create the user
    let user = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      isVerified: false,
      authType: "email",
    });

    // Create the profile
    let profile = await Profile.create({
      userId: user._id,
      user: username,
      email: email,
    });

    // Generate a verification token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verification link
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      text: `Click the following link to verify your email: ${verificationLink}`,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully!");
      res.status(201).json({ message: "Verification email sent!" });
    } catch (error) {
      console.error("Error sending verification email:", error);
      res.status(500).json({ message: "Failed to send verification email" });
    }
  } catch (err) {
    console.error("Error during registration:", err); 
    res.status(500).json({ message: "Server error" });
  }
};
//verify User 

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "Invalid token" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." });
    }
    // Mark user as verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified! You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};
// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.authType === "google") {
      return res.status(400).json({
        message: "This email is registered via Google. Please log in with Google.",
      });
    }

    if (!user.isVerified)
      return res.status(400).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
  const {id} = req.params;
 // console.log(id);
  const profile = await Profile.find({'userId' : id}).select('-email').populate({
    path: 'projectsJoined', // Populate the projectsJoined field
    select: 'projectName description _id', // Include only name, description, and _id
  }).populate({
    path: 'projectsCreated', // Populate the projectsCreated field
    select: 'projectName description _id', // Include only projectName, description, and _id
  });
  if (profile) {
    res.json(profile); 
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};


//Post User Profile (protected route)

const updateUserProfile = async (req,resp) =>{
  try {
    const { id } = req.params; // Get user ID from URL
    const updatedFields = req.body; // Get only the fields sent from frontend
    const skills = req.body?.skills;
    let experience = req.body?.experience;
    if (!id) {
      return resp.status(400).json({ error: "User ID is required" });
    }  
    let updatedUser;
    if(skills){
      updatedUser = await Profile.findOneAndUpdate(
       {'userId': id},
        { $addToSet: { skills: { $each: skills } } }, // Add skills uniquely
        { new: true, runValidators: true }
      );
    }
    else if(experience){
      //console.log("Received Experience:", experience);
      // Ensure experience is an array before updating
      if (!Array.isArray(experience)) {
        experience = [experience];
      }
        updatedUser = await Profile.findOneAndUpdate(
          {'userId': id},
           { $addToSet: { experience: { $each: experience } } }, // Add skills uniquely
           { new: true, runValidators: true }
         );
    }
    else{
       updatedUser = await Profile.findOneAndUpdate({'userId' : id}, updatedFields, {
       new: true, // Return updated user
      runValidators: true, // Ensure validation runs
      });
    }
    // Update only the provided fields
    if (!updatedUser) {
      return resp.status(404).json({ error: "User not found" });
    }
    resp.json({ success: true, updatedUser });
  } catch (error) {
    resp.status(500).json({ error: "Failed to update profile" });
  }
  
};

const getUsers = async (req,resp) =>{
  try {
    const {search , techStack, experienceLevel, availability, sorting} = req.query;
   
    let query = {};
    if (search) {
      query.$or = [
        { user: { $regex: search, $options: "i" } }, // Case-insensitive search for username
        { college: { $regex: search, $options: "i" } }, // Case-insensitive search for college name
      ];
    }
    
    if (techStack) query.skills = { $in: techStack };
   //  console.log(query);
    const users = await Profile.find(query);
    resp.json(users);
  } catch (error) {
    resp.status(500).json({ error: 'Server Error' });
  }
}


// JWT Token generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export  {registerUser,loginUser,getUserProfile,updateUserProfile,getUsers,verifyEmail}
