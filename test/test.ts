/// <reference path='../typings/index.d.ts' />
import jsonFetch from '../src/global/client/api/jsonfetch';
import {expect, assert} from 'chai';
var nock = require("nock");
var sinon = require('sinon');

describe('simple test', function() {
    it('should be true', function() {
        expect(true).to.equal(true);
    })
}); 

describe('jsonFetch', function() {
    it('successfully got data from url', function() {
        var promise = jsonFetch({url: 'google.com', method: 'GET'});
        promise.then(function(result){
            expect(result).to.not.be.undefined;
            //done();
        })
        .catch(function(err){
            expect(err).to.not.be.undefined;
            //done();
        })
    });
});

describe('jsonFetch', function(){
    afterEach(() => {
    nock.cleanAll();
  });
  
  it('should resolve request', function(done){
    nock('http://www.api.example.com').get('/resource').reply(200, {name: "edgar"});
        jsonFetch({ url: 'http://www.api.example.com/resource', method: 'get' })
    .then((result) => { 
        expect(result.status).to.equal(200);
        done(); 
    })
    .catch(done)
  });
}); 
