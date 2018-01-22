'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const templates = require('./lib/templates.js');

let {url} = templates;

require('../server.js');

describe('Test for image resource\'s API Routes', function () {
  describe('GET /api/image', () => {
    describe('With a proper resource and proper credentials', () => {
      it('Should return a 200 code and proper response body', done => {
        superagent.get(`${url}/api/image`)
        .send({})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('Without a proper resource', () => {
      it('Should return a 400 err status', done => {
        superagent.get(`${url}/api/image`)
        .send({})
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });
});
