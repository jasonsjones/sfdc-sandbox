import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Route', () => {
    let aUserId;

    describe('GET /users', () => {

        let response;

        before((done) => {
            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    expect(err).to.be.null;
                    response = res;
                    aUserId = res.body.payload[3]._id,
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

    describe('GET /user/:id', () => {
        let response;

        before((done) => {
            chai.request(app)
                .get(`/api/user/${aUserId}`)
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

        it('returns json with payload property that is an object', () => {
            expect(response.body).to.have.property('payload').that.is.an('object');
        });

        it('returns a payload that is the requested user', () => {
            let user = response.body.payload;
            expect(user).to.have.property('_id').that.is.an('string');
            expect(user._id).to.equal(aUserId);
            expect(user).to.have.property('email').that.is.an('string');
            expect(user).to.have.property('admin').that.is.an('boolean');
            expect(user.name).to.have.property('full').that.is.an('string');
        });

    });
});
