exports.getCurrentUser = (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: "No user logged in" });
    }
  };
  
  exports.logoutUser = (req, res) => {
    req.logout(() => {
      res.redirect(process.env.FRONTEND_URL);
    });
  };
  
  exports.authFailure = (req, res) => {
    res.status(401).json({ message: "Google Authentication Failed" });
  };
  