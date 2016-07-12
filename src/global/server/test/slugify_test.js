var chai = require('chai');
var expect = chai.expect;
var slugify = require('../src/global/server/slugify');

describe('slugify_test', function () {
    it('should transform as strings', function (){
        expect(slugify('Transform Space Into Dash')).to.equal('transform-space-into-dash');
        expect(slugify('Remove!Non@Word#Char$')).to.equal('removenonwordchar');
        expect(slugify('Replace--Multiple--Dash--With--Single')).to.equal('replace-multiple-dash-with-single');
        expect(slugify('-RemoveDashesFromBegAndEnd-')).to.equal('removedashesfrombegandend');
        expect(slugify('')).to.equal('');
        expect(slugify('22')).to.equal('22');
    });

    it('Shoudl fail on nonstring', function () {
        expect(function(){slugify(null)}).to.throw(Error)
        expect(function(){slugify(undefined)}).to.throw(Error)
        expect(function(){slugify(11)}).to.throw(Error)
    });

});