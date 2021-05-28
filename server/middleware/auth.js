const jwt = require("jsonwebtoken");
const { jwtkey } = require("../keys");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer qwertyuiop
  if (!authorization) {
    return res.status(401).send(false);
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtkey, async (err, payload) => {
    if (err) {
      return res.status(401).send(false);
    }
    next();
  });
};
