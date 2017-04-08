
import chai from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';

import factory from '../users/user.datafactory';
import { User } from '../users/user.model';
import * as AuthDataService from './auth.dataservice';

const expect = chai.expect;
const userFactory = factory();
const mockedUsers = userFactory.mockUsersFromServer();

describe('Auth Data Service', () => {
    describe('login()', () => {
        let UserMock;
        let verifyPasswordStub;

        before(() => {
            verifyPasswordStub = sinon.stub(User.prototype, 'verifyPassword');
        });

        after(() => {
            verifyPasswordStub.restore();
        });

        beforeEach(() => {
            UserMock = sinon.mock(User);
            UserMock.expects('findOne').withArgs({'local.username': 'arrow'})
                .chain('exec')
                .resolves(new User(mockedUsers[3]));
        });

        afterEach(() => {
            UserMock.restore();
        });

        it('returns a promise', () => {
            let arrow = {username: 'arrow', password: 'p@ssw0rd'};
            let promise = AuthDataService.login(arrow);
            expect(promise).to.be.a('Promise');
        });

        it('resolves to an object with authenticed and payload properties', () => {
            verifyPasswordStub.returns(true);
            let arrow = {username: 'arrow', password: 'p@ssw0rd'};
            let promise = AuthDataService.login(arrow);
            return promise.then(data => {
                expect(data).to.be.an('object');
                expect(data).to.have.property('authenticated');
                expect(data).to.have.property('payload');
                expect(data.payload).to.have.property('token');
                expect(data.payload).to.have.property('user');
            });
        });

        it('resolves to authenticated false with incorrect password', () => {
            verifyPasswordStub.returns(false);
            let arrow = {username: 'arrow', password: 'p@ssw0rd'};
            let promise = AuthDataService.login(arrow);
            return promise.then(data => {
                expect(data).to.be.an('object');
                expect(data.authenticated).to.be.false;
                expect(data).to.have.property('payload');
                expect(data.payload).to.have.property('token');
                expect(data.payload).to.have.property('user');
            });
        });

        it('resolves to null payload when user is not found', () => {
            UserMock.expects('findOne').withArgs({'local.username': 'notHere'})
                .chain('exec')
                .resolves(null);
            let noUser = {username: 'notHere', password: 'p@ssw0rd'};
            let promise = AuthDataService.login(noUser);
            return promise.then(data => {
                expect(data).to.be.an('object');
                expect(data.authenticated).to.be.false;
                expect(data).to.have.property('payload');
                expect(data.payload).to.be.null;
            });
        });

        it('resolves to null payload when username is not provided', () => {
            let noUser = {password: 'p@ssw0rd'};
            let promise = AuthDataService.login(noUser);
            return promise.then(data => {
                expect(data).to.be.an('object');
                expect(data.authenticated).to.be.false;
                expect(data).to.have.property('payload');
                expect(data.payload).to.be.null;
            });
        });

        it('resolves to null payload when password is not provided', () => {
            let noUser = {username: 'notHere'};
            let promise = AuthDataService.login(noUser);
            return promise.then(data => {
                expect(data).to.be.an('object');
                expect(data.authenticated).to.be.false;
                expect(data).to.have.property('payload');
                expect(data.payload).to.be.null;
            });
        });

    });
});
