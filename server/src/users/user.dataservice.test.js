import chai from 'chai';
import  sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';

import factory from './user.datafactory';
import { User, TestUser } from './user.model';
import * as UserDataService from './user.dataservice';

const expect = chai.expect;
const userFactory = factory();
const mockedUsers = userFactory.mockUsersFromServer();

describe('User Data Service', () => {

    describe('getUsers()', () => {
       let UserMock;
        beforeEach(() => {
            UserMock = sinon.mock(User);
            UserMock.expects('find').withArgs({})
                .chain('exec')
                .resolves(mockedUsers);
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

    describe('addUser()', () => {

        let user;

        before(() => {
            UserDataService.setModel(TestUser, "TestUserModel");
            user = {
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
        });

        after(() => {
            UserDataService.setModel(User, "UserModel");
            TestUser.collection.drop();
        });

        it('returns a promise that resolves to the saved user', () => {
            let result = UserDataService.addUser(user);
            expect(result).to.be.a('Promise');
            return result.then(data => {
                expect(data).to.exist;
                expect(data).to.be.an('object');
                expect(data).to.have.property('_id');
                expect(data.name).to.have.property('full')
            });
        })

    });
});
