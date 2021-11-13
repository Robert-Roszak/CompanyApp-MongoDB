const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Employee.find().populate('department'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Employee.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const emp = await Employee.findOne().skip(rand).populate('department');
      if(!emp) res.status(404).json({ message: 'Not found' });
      else res.json(emp);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getEEById = async (req, res) => {
    try {
      const emp = await Employee.findById(req.params.id).populate('department');
      if(!emp) res.status(404).json({ message: 'Not found' });
      else res.json(emp);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addEE = async (req, res) => {
    try {
      const { firstName, lastName, department } = req.body;
      const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department });
      await newEmployee.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.editEE = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    try {
      const emp = await Employee.findById(req.params.id);
      if(emp) {
        emp.firstName = firstName;
        emp.lastNam = lastName;
        emp.department = department;
        await emp.save();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteEE = async (req, res) => {
    try {
      const emp = await Employee.findById(req.params.id);
      if(emp) {
        await emp.remove();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};
