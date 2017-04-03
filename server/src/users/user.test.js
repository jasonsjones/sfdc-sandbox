import chai from 'chai';
import chaiHttp from 'chai-http';

import * as UserDataService from './user.dataservice';
import { User, TestUser } from './user.model';

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

    describe('integration tests to POST, PATCH, and DELETE a user', () => {

        let userId;
        before(() => {
            UserDataService.setModel(TestUser, "TestUserModel");
        });

        after(() => {
            UserDataService.setModel(User, "UserModel");
            TestUser.collection.drop();
        });

        describe('POST /users', () => {
            let response;
            before((done) => {
                let dig = {
                        name: {
                            first: 'John',
                            last: 'Diggle'
                        },
                        admin: true,
                        email: 'dig@queenconsolidated.com',
                        local: {
                            username: 'dig',
                            password: 'p@ssw0rd'
                        }
                };

                chai.request(app)
                    .post('/api/users')
                    .send(dig)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        response = res;
                        userId = response.body.payload._id;
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

            it('returns a payload that is the saved user', () => {
                let dig = response.body.payload;
                expect(dig).to.have.property('_id').that.is.an('string');
                expect(dig).to.have.property('email').that.is.an('string');
                expect(dig).to.have.property('admin').that.is.an('boolean');
                expect(dig.name).to.have.property('full').that.is.an('string');
            });

        });

        describe('PATCH /user/:id', () => {
            let response;
            let patchInfo;
            before((done) => {
                patchInfo = {
                    email: 'diggle@queenconsolidated.com',
                };

                chai.request(app)
                    .patch(`/api/user/${userId}`)
                    .send(patchInfo)
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

            it('returns a payload that is the patched user', () => {
                let dig = response.body.payload;
                expect(dig).to.have.property('_id').that.is.an('string');
                expect(dig).to.have.property('email').that.is.an('string');
                expect(dig).to.have.property('admin').that.is.an('boolean');
                expect(dig.name).to.have.property('full').that.is.an('string');
                expect(dig.email).to.equal(patchInfo.email);
            });

        });

        describe('DELETE /user/:id', () => {

        });

    });
});
