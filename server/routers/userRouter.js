const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
// const verifyToken = require("../middlewares/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
// router.get("/secure", verifyToken, userController.secureData); //testing ke liye use hota hai 

module.exports = router;
