'use strict';

var expect  = require('chai').expect;
var should = require('chai').should();
var request = require('request');

it('Body should have content', function(done) {
    request('http://localhost:8000/#!/portfolio' , function(error, response, body) {
        expect(body).to.not.equal('');
//        expect($scope.portfolio.length).toBe(8);
        done();
    });
});