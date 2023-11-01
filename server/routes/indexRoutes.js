const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { current } = require("../controllers/indexController");
const router = express.Router();

router.get("/", isAuthenticated, current);

module.exports = router;
