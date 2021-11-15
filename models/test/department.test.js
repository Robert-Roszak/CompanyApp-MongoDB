const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
    after(() => {
        mongoose.models = {};
    });

    it('should throw an error if no "name" arg', () => {
        const dep = new Department({});
        dep.validate(err => {
          expect(err.errors.name).to.exist;
        });
    });

    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for(let name of cases) {
            const dep = new Department({ name });
            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should throw an error if "name" is shorther than 5 and longer than 20 characters', () => {
        const cases = ['test', 'abc', 'wordLongerThanTwentyCharacters'];
        for(let name of cases) {
            const dep = new Department({ name });
            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should not throw an error if "name" is correct lenght', () => {
        const cases = ['Management', 'Human Resources'];
        for(let name of cases) {
            const dep = new Department({ name });
            dep.validate(err => {
                expect(err).to.not.exist;
            });
        }
    });
  
});