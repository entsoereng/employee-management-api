const express = require('express');
const router = express.Router();


const Employee = require('../../models/employee');

const EmployeeController = require('../../controllers/employee');

// GET request to get all employees
router.get('/', EmployeeController.employee_get_all);

// POST request to create employee
router.post('/', EmployeeController.empoloyee_creat_employee);

// GET request to get employee by ID
router.get('/:employeeId', EmployeeController.employee_get_employee);

// PATCH request to update employee
router.patch('/:employeeId', EmployeeController.employee_update_employee);

// PATCH request to deactivate an employee profile
router.patch('/:employeeId/deactivate', EmployeeController.employee_deactivate_employee);

// DELETE request to delete employee
router.delete('/:employeeId', EmployeeController.employee_delete_employee);



module.exports = router;