const Department = require('../models/departmentModel');

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new department
const createDepartment = async (req, res) => {
  const { name, description } = req.body;

  console.log('did yiu reach here ', name , description)
  const department = new Department({
    name,
    description,
  });

  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a department
const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    department.name = req.body.name || department.name;
    department.description = req.body.description || department.description;
    const updatedDepartment = await department.save();
    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await department.remove();
    res.status(200).json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};