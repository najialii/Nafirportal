const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
const upload = require('../middlewares/upload');

// Define the route for uploading CVs
router.post('/upload', upload.single('file'), cvController.uploadCV);

// Other CV routes
router.get('/', cvController.getAllCVs);
router.get('/:id', cvController.getCVById);

module.exports = router;
