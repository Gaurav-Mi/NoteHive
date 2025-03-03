const jwt = require("jsonwebtoken");

function fetchUser(req, res, next) {
  try {
    const header = req.header("auth-token");
    if (!header) {
      return res.status(401).send("Access Denied: No token provided");
    }

      const verifyJwt = jwt.verify(header, process.env.secretKey);
      req.user = verifyJwt;
     return next()
  } catch (error) {
      console.log(error.message)
      res.status(500).send("Internal Server Error!!!")
  }
}

module.exports = fetchUser