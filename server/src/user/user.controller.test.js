import  chai from 'chai';
import  sinon from 'sinon';
import 'sinon-as-promised';

import * as UserController from './user.controller';
import * as UserDataService from './user.dataservice';
import factory from './user.datafactory';

const expect = chai.expect;
const userFactory = factory();
const mockedUsers = userFactory.mockUsersFromServer();

describe('User Controller', function () {
    let req = {};
    let res = {};

    beforeEach(function () {
        res = {
            json: sinon.spy(),
            status: sinon.spy()
        };
    });

    describe('getUsers()', function () {
        let stub;
        beforeEach(function () {
            stub = sinon.stub(UserDataService, "getUsers");
        });

        afterEach(function () {
            stub.restore();
        });

        it('calls res.json()', (done) => {
            stub.resolves([]);
            UserController.getUsers(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with response obj', (done) => {
            stub.resolves([]);
            let resObj = {success: true, payload: []};

            UserController.getUsers(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });
    });

    describe('getUser()', function () {
        let stub;
        let arrowId = mockedUsers[3]._id;
        beforeEach(function () {
            stub = sinon.stub(UserDataService, "getUser");
            req = {
                params: {
                    id: arrowId
                }
            };
        });

        afterEach(function () {
            stub.restore();
        });

        it('calls res.json()', (done) => {
            stub.resolves(mockedUsers[3]);
            UserController.getUser(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with response obj', (done) => {
            stub.resolves(mockedUsers[3]);
            let resObj = {success: true, payload: mockedUsers[3]};

            UserController.getUser(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

        it('does not call res.json() when there is an error', (done) => {
            stub.rejects('User not found');
            UserController.getUser(req, res, function (err) {
                expect(res.json.notCalled).to.be.true;
                expect(err).to.exist;
                done();
            });
        });

    });

    describe('addUser()', function () {
        let addUserStub;
        before(function () {
            req.body = {
                name: {
                    first: 'Oliver',
                    last: 'Queen'
                },
                email: 'oliver@queenconsolidated.com',
                admin: true,
                local: {
                    username: 'arrow',
                    password: 'p@ssw0rd'
                }
            };
        })

        beforeEach(function () {
            addUserStub = sinon.stub(UserDataService, "addUser");
        });

        afterEach(function () {
            addUserStub.restore();
        });

        it('calls res.json()', (done) => {
            addUserStub.resolves(mockedUsers[3]);
            UserController.addUser(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with a response object containing the user added', (done) => {
            addUserStub.resolves(mockedUsers[3]);
            UserController.addUser(req, res, function () {
                let args = res.json.args[0][0];
                expect(res.json.calledOnce).to.be.true;
                expect(res.status.calledWith(201)).to.be.true;
                expect(args).to.exist;
                expect(args).to.have.property('success');
                expect(args).to.have.property('payload');
                expect(args.payload.email).to.equal(req.body.email);
                expect(args.payload.local.username).to.equal(req.body.local.username);
                done();
            });
        });

        it('does not call res.json() when there is an error', (done) => {
            addUserStub.rejects('Something went wrong while adding user');
            UserController.addUser(req, res, function (err) {
                expect(res.json.notCalled).to.be.true;
                expect(err).to.exist;
                done();
            });
        });
    });

    describe('patchUser()', function () {
        let stub;
        let arrowId = mockedUsers[3]._id;
        let updatedArrow;
        beforeEach(function () {
            stub = sinon.stub(UserDataService, 'patchUser');
            req = {
                params: {
                    id: arrowId
                },
                body: {
                    email: 'arrow@queenconsolidated.com'
                }
            };
            updatedArrow = mockedUsers[3];
            updatedArrow.email = req.body.email;
        });

        afterEach(function () {
            stub.restore();
        });

        it('calls res.json()', (done) => {
            stub.resolves(updatedArrow);

            UserController.patchUser(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with response obj', (done) => {
            stub.resolves(updatedArrow);
            let resObj = {success: true, payload: updatedArrow};

            UserController.patchUser(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

        it('does not call res.json() when there is an error', (done) => {
            stub.rejects('User not found');
            UserController.patchUser(req, res, function (err) {
                expect(res.json.notCalled).to.be.true;
                expect(err).to.exist;
                done();
            });
        });
    });

    describe('removeUser()', function () {
        let stub;
        let arrowId = mockedUsers[3]._id;
        beforeEach(function () {
            stub = sinon.stub(UserDataService, "removeUser");
            req = {
                params: {
                    id: arrowId
                }
            };
        });

        afterEach(function () {
            stub.restore();
        });

        it('calls res.json()', (done) => {
            stub.resolves(mockedUsers[3]);
            UserController.removeUser(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with response obj', (done) => {
            stub.resolves(mockedUsers[3]);
            let resObj = {success: true, payload: mockedUsers[3]};

            UserController.removeUser(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

        it('does not call res.json() when there is an error', (done) => {
            stub.rejects('User not found');
            UserController.removeUser(req, res, function (err) {
                expect(res.json.notCalled).to.be.true;
                expect(err).to.exist;
                done();
            });
        });

    });
});
