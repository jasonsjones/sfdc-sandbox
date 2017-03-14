import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Route', () => {

    describe('GET /users', () => {

        let response;

        before((done) => {
            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    expect(err).to.be.null;
                    response = res;
                    done();
                });
        });

        it('returns json', () => {
            expect(response.type).to.eql('application/json');
        });

        it('returns json with success property that is a boolean', () => {
            expect(response.body).to.have.property('success').that.is.a('boolean');
        });

        it('returns json with payload property that is an array', () => {
            expect(response.body).to.have.property('payload').that.is.an('array');
        });
    });
});
