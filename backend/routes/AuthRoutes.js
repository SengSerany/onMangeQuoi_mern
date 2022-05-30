const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const { authHandler } = require('../middleware/authMiddleware');
const {
  newAuthAccount,
  createAuthAccount,
  newAuthSession,
  createAuthSession,
  showAuthAccount,
  deleteSessionAuth,
} = require('../controllers/authController');

authRouter.get('/register', newAuthAccount);
authRouter.post('/register', createAuthAccount);
authRouter.get('/login', newAuthSession);
authRouter.post('/login', passport.authenticate('local'), createAuthSession);
authRouter.get('/profile', authHandler, showAuthAccount);
authRouter.delete('/logout', authHandler, deleteSessionAuth);

module.exports = authRouter;
