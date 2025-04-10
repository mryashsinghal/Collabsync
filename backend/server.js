import express from 'express'
import http from 'http'
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import socketHandler from './config/socket.js';
import chatRoutes from './routes/messageRoutes.js';
import dbConnection from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import authRoutes from './routes/authRoutes.js';
import passport from 'passport';
import passportConnection from './config/passport.js';
import session from 'express-session';

// Environment Variables
import dotenv from 'dotenv';
dotenv.config();

// Express setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
dbConnection();


//Passport Configuration

passportConnection();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API routes


//Authentiaction

app.use('/api/user',authRoutes);

//API for Google OAuth

app.use('/api/auth',authRoutes);


// API for the Registration

app.use('/api/users', userRoutes);
app.use('/api/project',projectRoutes);

// API fro message

app.use('/api/chat',messageRoutes);

// Socket.io setup 
socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 