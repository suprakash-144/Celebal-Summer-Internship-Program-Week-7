const isAdmin = (req, res, next) => {
  try {
    let { role } = req.user;
    if (role == "Admin") {
      next();
    }
  } catch {
    res.sendStatus(403);
  }
};

module.exports = isAdmin;
