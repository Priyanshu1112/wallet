var express = require("express");
var router = express.Router();
const {
  currentAdmin,
  updateAdmin,
  changePasswordAdmin,
  signUpAdmin,
  // allAdmins,
  // addAdmin,
  // deleteAdmin,
  signInAdmin,
  allUsers,
  addUser,
  updateUser,
  deleteUser,
  logOutAdmin,
} = require("../controllers/adminController");
const { isAuthenticated } = require("../middlewares/auth");

// ADMIN

/* GET /admin */
router.get("/", isAuthenticated, currentAdmin);

// POST /signUp-admin
router.post("/signUp-admin", signUpAdmin);

// GET / all - admins;
// router.get("/all-admins", allAdmins);

// POST /add-admin
// router.post("/add-admin", addAdmin);

// PUT /update-admin
router.put("/update-admin", isAuthenticated, updateAdmin);

//PUT /change-password
router.put("/change-password", isAuthenticated, changePasswordAdmin);

//DELETE /delete-admin
// router.delete("/delete-admin:id", deleteAdmin);

// POST /signIn-admin
router.post("/signIn-admin", signInAdmin);

// GET /logOut-admin
router.get("/logOut-admin", isAuthenticated, logOutAdmin);

// USERS

// GET / all - users;
router.get("/all-users", isAuthenticated, allUsers);

// POST /add-user
router.post("/add-user", isAuthenticated, addUser);

// PUT /update-user/:id
router.put("/update-user/:id", isAuthenticated, updateUser);

//DELETE /delete-user:id
router.delete("/delete-user/:id", isAuthenticated, deleteUser);

module.exports = router;
