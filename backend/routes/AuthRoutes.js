const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
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
authRouter.get('/profile', showAuthAccount);
authRouter.delete('/logout', deleteSessionAuth);

module.exports = authRouter;
