const adminsOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  else {
    let err = new Error()
    err.message = 'You must be an admin!';
    err.status = 401;
    next(err)
  }
};

const selfOrAdmin = (req, res, next) => {
  if (req.user.id == req.params.id || req.user.isAdmin) return next()
  else {
    let err = new Error()
    err.message = 'You must be logged in!';
    err.status = 401;
    next(err)
  }
}

module.exports = {adminsOnly, selfOrAdmin}
