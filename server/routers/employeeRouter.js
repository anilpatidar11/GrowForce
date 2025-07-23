const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/add', verifyToken, EmployeeController.addEmployee);
router.delete('/delete/:id', verifyToken, EmployeeController.deleteEmployee);
router.get('/allemp', verifyToken, EmployeeController.getEmployee);
router.put('/edit/:id', verifyToken, EmployeeController.updateEmployee);
router.get('/getemp/:id', verifyToken, EmployeeController.getSingleEmployee);

module.exports = router;
