var express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  signInUser,
  currentUser,
  logOutUser,
} = require("../controllers/userController");
var router = express.Router();

/* GET  /. */
router.get("/", isAuthenticated, currentUser);

// POST /signIn-user
router.post("/signIn-user", signInUser);

// GET /logOut-user
router.get("/logOut-user", isAuthenticated, logOutUser);

module.exports = router;
