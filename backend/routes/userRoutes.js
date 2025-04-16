import express from 'express';
import { registerUser, loginUser, getUserProfile ,updateUserProfile,getUsers,verifyEmail,resendMail} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

// User registration
router.post('/register', registerUser);
router.get('/verify-email',verifyEmail);

// User login
router.post('/login', loginUser);
router.post('/resend-verification',resendMail);

// Get user profile (protected route)
router.get('/profile/:id', getUserProfile);
router.patch('/profile/:id',updateUserProfile);
router.get('/all',getUsers);

export default router;
