import chai from 'chai';
import  sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';

import factory from './user.datafactory';
import { User } from './user.model';
import * as UserDataService from './user.dataservice';

const expect = chai.expect;
const userFactory = factory();

describe('User Data Service', () => {
    describe('getUsers()', () => {
       let UserMock;
        beforeEach(() => {
            UserMock = sinon.mock(User);
            UserMock.expects('find').withArgs({})
                .chain('exec')
                .resolves(userFactory.mockUsersFromServer());
        });

        afterEach(() => {
            UserMock.restore();
        });

        it('returns a promise', () => {
            let result = UserDataService.getUsers();
            expect(result).to.be.a('Promise');
        });

        it('resolves to an array of users', () => {
            var result = UserDataService.getUsers();
            return result.then(data => {
                expect(data).to.be.an('array');
            });
        });

    });
});
