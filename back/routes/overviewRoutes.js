const express = require("express");
const { Overview } = require("../controllers/overviewController");
const { authMiddleware, roleMiddleware } =  require('../middleware/requireauth');

const router = express.Router();

router.get("/", authMiddleware,roleMiddleware('superadmin', 'admin') , Overview); 

module.exports = router;
