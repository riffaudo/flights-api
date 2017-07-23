var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var fs = require('fs');
var should = chai.should();
var assert = chai.assert;

chai.use(chaiHttp);

var exampleRequest = JSON.parse(fs.readFileSync('./tests/example-request.json', 'utf8'));
var exampleResponse = JSON.parse(fs.readFileSync('./tests/example-response.json', 'utf8'));

describe('/POST flights', () => {
    it('should return an error message when the json is invalid', (done) => {
        chai.request(server)
            .post('/flights')
            .send('{brokenjson')
            .type('json')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('example data sets should match', (done) => {
        chai.request(server)
            .post('/flights')
            .send(exampleRequest)
            .type('json')
            .end((err, res) => {
                res.should.have.status(200);
                assert(JSON.stringify(exampleResponse), res.body, 'Examples do not match');

                done();
            });
    });
});