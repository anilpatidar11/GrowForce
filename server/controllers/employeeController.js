const EmployeeSchemaModel = require("../models/employeeModel");

// Add Employee
const addEmployee = async (req, res) => {
  try {
    //console.log("Add Employee - CreatedBy:", req.user.id); 

    const { name, email, phone, position, department, salary } = req.body;

    if (!name || !email) {
      return res.status(400).json({ status: false, message: "Name and email are required" });
    }

    const employee = await EmployeeSchemaModel.create({
      name,
      email,
      phone,
      position,
      department,
      salary,
      createdBy: req.user.id
    });

    return res.status(201).json({
      status: true,
      message: "Employee added successfully",
      employee
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// Delete Employee (with ownership check)
const deleteEmployee = async (req, res) => {
  try {
    //console.log("Delete Employee - CreatedBy:", req.user.id);

    const employee = await EmployeeSchemaModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    if (employee.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ status: false, message: "Forbidden: Not your employee" });
    }

    await employee.deleteOne();

    return res.status(200).json({ status: true, message: "Employee deleted" });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// Get Employees of Logged-in User
const getEmployee = async (req, res) => {
  try {
    //console.log("Get All Employees - CreatedBy:", req.user.id); 

    const employees = await EmployeeSchemaModel.find({ createdBy: req.user.id });
    return res.status(200).json({ status: true, data: employees });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// Update Employee (with ownership check)
const updateEmployee = async (req, res) => {
  try {
   // console.log("Update Employee - CreatedBy:", req.user.id); // 

    const employee = await EmployeeSchemaModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    if (employee.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ status: false, message: "Forbidden: Not your employee" });
    }

    const updatedEmployee = await EmployeeSchemaModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({ status: true, updatedEmployee });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Get Single Employee (with ownership check)
const getSingleEmployee = async (req, res) => {
  try {
    // console.log("Get Single Employee - CreatedBy:", req.user.id); // 

    const employee = await EmployeeSchemaModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    if (employee.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ status: false, message: "Forbidden: Not your employee" });
    }

    res.status(200).json({ status: true, data: employee });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  addEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
  getSingleEmployee
};
