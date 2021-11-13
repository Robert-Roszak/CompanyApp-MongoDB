const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getEEById);
router.post('/employees', EmployeeController.addEE);
router.put('/employees/:id', EmployeeController.editEE);
router.delete('/employees/:id', EmployeeController.deleteEE);

module.exports = router;
