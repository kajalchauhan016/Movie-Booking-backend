const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ mssg: "token is not found" });
    }
    const info = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: info.id };
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = verify;
