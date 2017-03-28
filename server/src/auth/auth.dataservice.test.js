
import chai from 'chai';
import  sinon from 'sinon';
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
        beforeEach(() => {
            UserMock = sinon.mock(User);
            UserMock.expects('findOne').withArgs({'local.username': 'arrow'})
                .chain('exec')
                .resolves(mockedUsers[3]);
        });

        afterEach(() => {
            UserMock.restore();
        });

        it('returns a promise', () => {
            let arrow = {username: 'arrow', password: 'p@ssw0rd'};
            let result = AuthDataService.login(arrow);
            expect(result).to.be.a('Promise');
        });

    });
});
