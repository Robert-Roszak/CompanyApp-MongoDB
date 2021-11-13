const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/department.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getDepById);
router.post('/departments', DepartmentController.addDep);
router.put('/departments/:id', DepartmentController.editDep);
router.delete('/departments/:id', DepartmentController.deleteDep);

module.exports = router;
