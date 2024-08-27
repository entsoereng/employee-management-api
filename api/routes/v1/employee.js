const express = require('express');
const router = express.Router();


const Employee = require('../../models/employee');

const EmployeeController = require('../../controllers/employee');


router.get('/', EmployeeController.employee_get_all);

router.post('/', EmployeeController.empoloyee_creat_employee);

router.get('/:employeeId', EmployeeController.employee_get_employee);

router.patch('/:employeeId', EmployeeController.employee_update_employee);

// PATCH request to deactivate an employee profile
router.patch('/:employeeId/deactivate', EmployeeController.employee_deactivate_employee);


router.delete('/:employeeId', EmployeeController.employee_delete_employee);



module.exports = router;