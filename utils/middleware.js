const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

const isAuthenticated = (req, res, next) => {
  const getToken = (req) => {
    const authorization = req.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer")) return authorization.substring(7);

    return null;
  };

  const getDecodedToken = (req) => {
    const token = getToken(req);
    const decodedToken = token ? jwt.verify(token, JWT_SECRET) : null;

    if (!token || !decodedToken) return res.status(401).send({ error: "Invalid or Missing Token" });

    return decodedToken;
  };

  req.token = getDecodedToken(req);

  next();
};

module.exports = { isAuthenticated };
