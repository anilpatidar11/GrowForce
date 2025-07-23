const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Access denied. Token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;// jb authenticate user hi employee add ya kuch krta hai tb frontend se token aata hai yha decode hota hai fir req.user k dwara id secure route pr jati hai 
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyToken;
