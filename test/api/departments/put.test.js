const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'url to remote db';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/companyDBtest';
else dbUri = 'mongodb://localhost:27017/companyDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

describe('PUT /api/departments', () => {
    beforeEach(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
    });

    afterEach(async () => {
        await Department.deleteMany();
    });

    it('/:id should update chosen document and return success', async () => {
        const res = await request(server).put('/api/departments/5d9f1140f10a81216cfd4408').send({ name: '=#Department #1=' });
        const updatedDepartment = await Department.findOne({name: '=#Department #1='});
        expect(res.status).to.be.equal(200);
        expect(updatedDepartment).to.not.be.null;
        expect(updatedDepartment.name).to.be.equal('=#Department #1=');
    });
  });
