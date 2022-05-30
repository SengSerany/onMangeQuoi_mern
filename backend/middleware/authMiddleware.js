const authHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/api/v1/auth/login/?auth=false');
  }
};

module.exports = {
  authHandler,
};
