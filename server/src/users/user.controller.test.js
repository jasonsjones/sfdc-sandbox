import  chai from 'chai';
import  sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';

import { User } from './user.model';
import * as UserController from './user.controller';

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
       let UserMock;
        beforeEach(() => {
            UserMock = sinon.mock(User);
            UserMock.expects('find').withArgs({})
                .chain('exec')
                .resolves([]);
        });
        afterEach(() => {
            UserMock.restore();
        });

        it('calls res.json()', (done) => {
            UserController.getUsers(req, res, function () {
                UserMock.verify();
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with response obj', (done) => {
            let resObj = {success: true, payload: []};

            UserController.getUsers(req, res, function () {
                UserMock.verify();
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });
    });

});
