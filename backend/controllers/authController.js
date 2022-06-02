const asyncHandler = require('express-async-handler');
const Auth = require('../models/authModel');

// New user account
const newAuthAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ entryPoint: 'new register' });
});

// Create user account
const createAuthAccount = asyncHandler(async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (!username || !email || !password || !passwordConfirm) {
    res.status(400);
    throw new Error('All field must be completed');
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error("The confirmation password don't match with the password");
  }

  const isAuthExist = await Auth.findOne({ email });
  if (isAuthExist) {
    res.status(400);
    throw new Error('This email is already used');
  }

  await Auth.register(
    new Auth({ username, email }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log('error while user register!', err);
        res.status(400);
        throw new Error('Your account could not be saved');
      } else {
        res.status(200).json({
          endpoint: 'Register user',
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      }
    }
  );
});

// New user session
const newAuthSession = asyncHandler(async (req, res) => {
  const isAuthorised = req.query.auth;
  res.status(200).json({
    entryPoint: 'new login',
    auth: isAuthorised && 'You must be logged',
  });
});

// Create user session
const createAuthSession = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie('userid', req.user.id, { maxAge: 60 * 60 * 1000 })
    .cookie('username', req.user.username, { maxAge: 60 * 60 * 1000 })
    .json({ endpoint: 'Login user', user: req.user });
});

// Show user account
const showAuthAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Profile user', user: req.user });
});

// Delete session user
const deleteSessionAuth = asyncHandler(async (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res
      .clearCookie('connect.sid')
      .clearCookie('userid')
      .clearCookie('username')
      .status(200)
      .json({ endpoint: 'Delete session user' });
  });
});

module.exports = {
  newAuthAccount,
  createAuthAccount,
  newAuthSession,
  createAuthSession,
  showAuthAccount,
  deleteSessionAuth,
};
