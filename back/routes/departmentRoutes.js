const express = require('express');
const router = express.Router();
const {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/departmentController');

// Get all departments
router.get('/', getDepartments);

// Create a new department
router.post('/', createDepartment);

// Update a department
router.put('/:departmentId', updateDepartment);

// Delete a department
router.delete('/:departmentId', deleteDepartment);

module.exports = router;