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

describe('POST /api/departments', () => {
    afterEach(async () => {
        await Department.deleteMany();
    });

    it('/ should insert new document to db and return success', async () => {
        const res = await request(server).post('/api/departments').send({ name: '#Department #1' });
        const newDepartment = await Department.findOne({ name: '#Department #1' });
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(newDepartment).to.not.be.null;
      });
  });
