const express = require("express");
const multer = require("multer");
const cvController = require("../controllers/cvController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });


router.post("/upload", upload.single("cv"), cvController.uploadCV);
router.get("/", cvController.getAllCVs);
router.get("/:id", cvController.getCVById);

module.exports = router;
