var chai = require('chai');
var expect = chai.expect;
var done = chai.done;
var manage = require('../script/manage');


describe('connect_test', function () {
    it('connect should return valid or an error connection', function(){
        var p = manage.connect({url: 'mongodb://localhost:27017/wattsproject'});
        p.then(function(db){
            expect(db).to.not.be.undefined;
            done();
        })
        .catch(function(err){
            expect(err).to.not.be.undefined;
            done();
        })
    });
    it('connect should return error object when given invalid url', function(){
        var p = manage.connect({url: 'verybadurl'});
        p.then(function(db){
            chai.assert(0, 1, 'promise error');
            done();
        })
        .catch(function(err){
            expect(err).to.not.be.undefined;
            done();
        })
    });
    it('connect should return error object when given empty url string', function(){
        var p = manage.connect({url: ' '});
        p.then(function(db){
            chai.assert(0, 1, 'promise error');
            done();
        })
        .catch(function(err){
            expect(err).to.not.be.undefined;
            done();
        })
    });
    it('connect should return error object when given an undefined value', function(){
        var p = manage.connect(undefined);
        p.then(function(db){
            chai.assert(0, 1, 'promise error');
            done();
        })
        .catch(function(err){
            expect(err).to.not.be.undefined;
            done();
        })
    });
    it('connect should return error object when given a null value', function(){
        var p = manage.connect(null);
        p.then(function(db){
            chai.assert(0, 1, 'promise error');
            done();
        })
        .catch(function(err){
            expect(err).to.not.be.undefined;
            done();
        })
    });  
});