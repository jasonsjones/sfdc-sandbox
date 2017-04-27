
import chai from 'chai';
import chaiHttp from 'chai-http';

import * as UserDataService from '../user/user.dataservice';
import { TestUser, User } from '../user/user.model';
import app from '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth Route', () => {
    let mockUser, mockUserData;
    before((done) => {
        UserDataService.setModel(TestUser, "TestUserModel");
        mockUserData = {
            name: {
                first: 'Oliver',
                last: 'Queen'
            },
            email: 'oliver@queenconsolidated.com',
            local: {
                username: 'arrow',
                password: 'p@ssw0rd'
            }
        };
        mockUser = new User(mockUserData);
        mockUser.save(function () {
            done();
        });
    });

    after(() => {
        UserDataService.setModel(User, "UserModel");
        TestUser.collection.drop();
    });

    describe('POST /api/login with valid credentials', () => {
        let response;

        before((done) => {
            chai.request(app)
                .post('/api/login')
                .send({username: 'arrow', password: 'p@ssw0rd'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    response = res;
                    done();
                });
        });

        it('returns json', () => {
            expect(response.status).to.equal(200);
            expect(response.type).to.eql('application/json');
        });

        it('returns json with success property that is true', () => {
            expect(response.body).to.have.property('success').that.is.a('boolean');
            expect(response.body.success).to.be.true;
        });

        it('returns json with message property that is a string', () => {
            expect(response.body).to.have.property('message').that.is.a('string');
        });

        it('returns json with payload property that is an object', () => {
            expect(response.body).to.have.property('payload').that.is.an('object');
            expect(response.body.payload).to.have.property('user');
            expect(response.body.payload).to.have.property('token');
        });

    });

    describe('POST /api/login with invalid password', () => {
        let response;

        before((done) => {
            chai.request(app)
                .post('/api/login')
                .send({username: 'arrow', password: 'p@ssword'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    response = res;
                    done();
                });
        });

        it('returns json', () => {
            expect(response.status).to.equal(200);
            expect(response.type).to.eql('application/json');
        });

        it('returns json with success property that is false', () => {
            expect(response.body).to.have.property('success').that.is.a('boolean');
            expect(response.body.success).to.be.false;
        });

        it('returns json with message property that is a string', () => {
            expect(response.body).to.have.property('message').that.is.a('string');
        });

        it('returns json with payload property that is an object', () => {
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.be.null
        });
    });

    describe('POST /api/login with invalid username', () => {
        let response;

        before((done) => {
            chai.request(app)
                .post('/api/login')
                .send({username: 'arr0w', password: 'p@ssw0rd'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    response = res;
                    done();
                });
        });

        it('returns json', () => {
            expect(response.status).to.equal(200);
            expect(response.type).to.eql('application/json');
        });

        it('returns json with success property that is false', () => {
            expect(response.body).to.have.property('success').that.is.a('boolean');
            expect(response.body.success).to.be.false;
        });

        it('returns json with message property that is a string', () => {
            expect(response.body).to.have.property('message').that.is.a('string');
        });

        it('returns json with payload property that is an object', () => {
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.be.null
        });
    });
});
