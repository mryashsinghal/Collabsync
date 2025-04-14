import express from 'express';
import passport from 'passport';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();


router.get('/me', authMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.user._id).select("-password"); // Exclude password
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});

router.get('/google',  passport.authenticate("google", { scope: ["profile", "email"] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth' }),
(req, res) => {
  try {
    // Ensure req.user is defined
    if (!req.user || !req.user.token) {
      throw new Error("User object or token is missing");
    }

    const token = req.user.token;
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  } catch (error) {
    //console.error("Error in Google OAuth callback:", error);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
