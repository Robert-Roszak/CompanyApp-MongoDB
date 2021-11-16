const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    before(async () => {
        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });

    describe('Reading data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Management' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Dane', department: 'Human Resources' });
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by "FirstName" with "findOne" method', async () => {
            const expectedName = 'John';
            const employee = await Employee.findOne({ firstName: expectedName });
            expect(employee.firstName).to.be.equal(expectedName);
        });

        it('should return a proper document by "lastName" with "findOne" method', async () => {
            const expectedName = 'Doe';
            const employee = await Employee.findOne({ lastName: expectedName });
            expect(employee.lastName).to.be.equal(expectedName);
        });

        it('should return a proper document by "department" with "findOne" method', async () => {
            const expectedName = 'Management';
            const employee = await Employee.findOne({ department: expectedName });
            expect(employee.department).to.be.equal(expectedName);
        });
    });

    describe('Creating data', () => {
        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'Jane', lastName: 'Dane', department: 'Department #1' });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });
    });
    
    describe('Updating data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Management' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Dane', department: 'Human Resources' });
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: 'Jonathan' }});
            const updatedEmployee = await Employee.findOne({ firstName: 'Jonathan' });
            expect(updatedEmployee).to.not.be.null;
        });
      
        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John' });
            employee.firstName = 'Jonathan';
            await employee.save();
          
            const updatedEmployee = await Employee.findOne({ firstName: 'Jonathan' });
            expect(updatedEmployee).to.not.be.null;
        });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
            const employees = await Employee.find({ firstName: 'Updated!' });
            expect(employees.length).to.be.equal(2);
        });
    });
    
    describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Management' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Dane', department: 'Human Resources' });
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'John' });
            const removedEmployee = await Employee.findOne({ firstName: 'John' });
            expect(removedEmployee).to.be.null;
        });
      
        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John' });
            await employee.remove();
            const removedEmployee = await Employee.findOne({ firstName: 'John' });
            expect(removedEmployee).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });
    });
});