"use strict";
/// <reference path='../typings/index.d.ts' />
var jsonfetch_1 = require('../src/global/client/api/jsonfetch');
var chai_1 = require('chai');
var nock = require("nock");
var sinon = require('sinon');
describe('simple test', function () {
    it('should be true', function () {
        chai_1.expect(true).to.equal(true);
    });
});
describe('jsonFetch', function () {
    it('successfully got data from url', function (done) {
        var promise = jsonfetch_1["default"]({ url: 'google.com', method: 'GET' });
        promise.then(function (result) {
            chai_1.expect(result).to.not.be.undefined;
            //done();
        })
            .catch(done);
    });
});
describe('jsonFetch', function () {
    afterEach(function () {
        nock.cleanAll();
    });
    it('should resolve request', function (done) {
        nock('http://www.api.example.com').get('/resource').reply(200, { name: "edgar" });
        jsonfetch_1["default"]({ url: 'http://www.api.example.com/resource', method: 'get' })
            .then(function (result) {
            chai_1.expect(result.status).to.equal(200);
            done();
        })
            .catch(done);
    });
});
