import  chai from 'chai';
import  sinon from 'sinon';
import 'sinon-as-promised';

import * as UserController from './user.controller';
import * as UserDataService from './user.dataservice';
import factory from './user.datafactory';

const expect = chai.expect;
const userFactory = factory();
const mockedUsers = userFactory.mockUsersFromServer();

describe('User Controller', () => {
    let req = {};
    let res = {};

    beforeEach(() => {
        res = {
            json: sinon.spy(),
            status: sinon.spy()
        };
    });

    describe('getUsers()', () => {
       let stub;
        beforeEach(() => {
            stub = sinon.stub(UserDataService, "getUsers");
        });

        afterEach(() => {
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

    describe('addUser()', () => {
        let addUserStub;
        before(() => {
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

        beforeEach(() => {
            addUserStub = sinon.stub(UserDataService, "addUser");
        });

        afterEach(() => {
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
                expect(args).to.exist;
                expect(args).to.have.property('success');
                expect(args).to.have.property('payload');
                expect(args.payload.email).to.equal(req.body.email);
                expect(args.payload.local.username).to.equal(req.body.local.username);
                done();
            });
        });

    });
});
