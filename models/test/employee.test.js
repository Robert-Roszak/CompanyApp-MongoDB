const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    after(() => {
        mongoose.models = {};
    });

    it('should throw an error if no args', () => {
        const emp = new Employee({});
        emp.validate(err => {
          expect(err).to.exist;
        });
    });

    it('should throw an error if one of the args is missing', () => {
        const cases = [
            {firstName: '', lastName: 'Doe', department: 'Management'},
            {firstName: 'John', lastName: '', department: 'Management'},
            {firstName: 'John', lastName: 'Doe', department: ''}];
        for (let name of cases) {
            const emp = new Employee({name});
            emp.validate(err => {
                expect(err).to.exist;
            });
        }
    });

    it('should throw an error if args are not a string', () => {
        const cases = [{}, []];
        for(let name of cases) {
            const emp = new Employee({ name });
            emp.validate(err => {
                expect(err).to.exist;
            });
        }
    });  

    it('should not throw an error if all args provided', () => {
        const emp = new Employee({firstName: 'John', lastName: 'Doe', department: 'Management'});
        emp.validate(err => {
            expect(err).to.not.exist;
        });
    });  
});