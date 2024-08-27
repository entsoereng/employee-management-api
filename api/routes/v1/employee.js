const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../../models/employee');


router.get('/', (req, res, next) => {
    Employee.find()
        .select('first_name last_name position department email phone is_active')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                employee: docs.map((doc => {
                    return {
                        first_name: doc.first_name,
                        last_name: doc.last_name,
                        position: doc.position,
                        department: doc.department,
                        email: doc.email,
                        phone: doc.phone,
                        is_active: doc.is_active,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/employee/' + doc._id
                        }
                    };
                }))
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        position: req.body.position,
        department: req.body.department,
        email: req.body.email,
        phone: req.body.phone
    });

    employee
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Employee created',
                createdEmployee: {
                    first_name: result.first_name, // Use result instead of doc
                    last_name: result.last_name,
                    position: result.position,
                    department: result.department,
                    email: result.email,
                    phone: result.phone,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/employee/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err.message || 'An error occurred during the creation of the employee.' // More informative error
            });
        });
});

router.get('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    Employee.findById(id)
        .select('first_name last_name position department email phone is_active')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    employee: doc,
                    request: {
                        type: 'GET',
                        description: 'Get Employees',
                        url: 'http://localhost:3000/employee'
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: 'No valid entry found for employee ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Employee.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Employee updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/employee/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// PATCH request to deactivate an employee profile
router.patch('/:employeeId/deactivate', (req, res, next) => {
    const id = req.params.employeeId;

    Employee.updateOne({ _id: id }, { $set: { is_active: false, updated_at: Date.now() } })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Employee deactivated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/employees/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    Employee.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Employee deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/employee',
                    body: {
                        first_name: 'String',
                        last_name: 'String',
                        position: 'String',
                        department: 'String',
                        email: 'String',
                        phone: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;