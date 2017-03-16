import  chai from 'chai';
import  sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';

import { User } from './user.model';
import { UserController } from './user.controller';

const expect = chai.expect;

describe.skip('User Controller', () => {
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
    });

});
