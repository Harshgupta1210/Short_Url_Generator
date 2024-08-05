const { getUser } = require("../service/Auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie.split("Bearer ")[1]; // Assuming the token is prefixed with "Bearer "
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");
    // if (!roles.includes(req.user.role)) return res.status(403).send("Forbidden");
    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
