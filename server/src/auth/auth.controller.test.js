import  chai from 'chai';
import  sinon from 'sinon';
import 'sinon-as-promised';

import * as AuthController from './auth.controller';
import * as AuthDataService from './auth.dataservice';
import factory from '../users/user.datafactory';
import tokenFactory from './auth.jwttokenfactory';

const expect = chai.expect;
const userFactory = factory();
const mockedUsers = userFactory.mockUsersFromServer();
const mockedToken = tokenFactory().getToken();

describe('Auth Controller', () => {
    let req = {};
    let res = {};

    beforeEach(() => {
        res = {
            json: sinon.spy(),
            status: sinon.spy()
        };
    });

    describe('login()', () => {
        let stub;
        beforeEach(() => {
            stub = sinon.stub(AuthDataService, "login");
            req = {
                body: {
                    username: 'arrow',
                    password: 'p@ssw0rd'
                }
            };
        });

        afterEach(() => {
            stub.restore();
        });

        it('calls res.json()', (done) => {
            let mockedDSResponse = {
                authenticated: true,
                token: mockedToken,
                payload: mockedUsers[3]
            };
            stub.resolves(mockedDSResponse);

            AuthController.login(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with response object when authentication succeeds', (done) => {
            let mockedDSResponse = {
                authenticated: true,
                token: mockedToken,
                payload: mockedUsers[3]
            };
            stub.resolves(mockedDSResponse);

            let resObj = {
                success: true,
                message: 'User authenticated',
                payload: {
                    user: mockedUsers[3],
                    token: mockedToken
                }
            }

            AuthController.login(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

        it('calls res.json() with response object when authentication fails', (done) => {
            let mockedDSResponse = {
                authenticated: false,
                token: null,
                payload: mockedUsers[3]
            };
            stub.resolves(mockedDSResponse);

            let resObj = {
                success: false,
                message: 'User not authenticated',
                payload: null
            }

            AuthController.login(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

        it('calls res.json() with response object when username is not provided', (done) => {
            let mockedDSResponse = {
                authenticated: false,
                token: null,
                payload: null
            };
            stub.resolves(mockedDSResponse);

            req = {
                body : {
                    password: 'password'
                }
            };

            let resObj = {
                success: false,
                message: 'Username and password is required',
                payload: null
            }

            AuthController.login(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

        it('calls res.json() with response object when password is not provided', (done) => {
            let mockedDSResponse = {
                authenticated: false,
                token: null,
                payload: null
            };
            stub.resolves(mockedDSResponse);

            req = {
                body : {
                    username: 'arrow'
                }
            };

            let resObj = {
                success: false,
                message: 'Username and/or password is required',
                payload: null
            }

            AuthController.login(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

    });
});
