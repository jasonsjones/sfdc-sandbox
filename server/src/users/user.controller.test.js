import  chai from 'chai';
import  sinon from 'sinon';
import 'sinon-as-promised';

import * as UserController from './user.controller';
import * as UserDataservice from './user.dataservice';

const expect = chai.expect;

describe('User Controller', () => {
    let req
    let res

    beforeEach(() => {
        res = {
            json: sinon.spy(),
            status: sinon.spy()
        };
    });

    describe('getUsers()', () => {
       let stub;
        beforeEach(() => {
            stub = sinon.stub(UserDataservice, "getUsers");
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

});
