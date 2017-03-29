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
            let promise = UserDataService.getUsers();
            expect(promise).to.be.a('Promise');
        });

        it('resolves to an array of users', () => {
            var promise = UserDataService.getUsers();
            return promise.then(data => {
                expect(data).to.be.an('array');
            });
        });
    });

    describe('getUser()', () => {
        let UserMock;
        let arrowId;

        beforeEach(() => {
            arrowId = mockedUsers[3]._id;
            UserMock = sinon.mock(User);
            UserMock.expects('findById').withArgs(arrowId)
                .chain('exec')
                .resolves(mockedUsers[3]);
        });

        afterEach(() => {
            UserMock.restore();
        });

        it('returns a promise', () => {
            let promise = UserDataService.getUser(arrowId);
            expect(promise).to.be.a('Promise');
        });

        it('resolves to a user', () => {
            var promise = UserDataService.getUser(arrowId);
            return promise.then(data => {
                expect(data).to.be.an('object');
                expect(data).to.have.property('email');
                expect(data).to.have.property('name');
                expect(data.name).to.have.property('full');
                expect(data).to.have.property('local');
                expect(data).to.have.property('createdDate');
            });
        });

        it('rejects with error when user does not exit', () => {
            let badUserId = '589e9e5ca8101500221a6b5f';
            UserMock.expects('findById').withArgs(badUserId)
                .chain('exec')
                .rejects('User does not exist');

            var promise = UserDataService.getUser(badUserId);

            return promise.then(data => {
                console.log(data);
            })
            .catch(err => {
                expect(err).to.exist;
            });
        });

    });

    describe('add and remove user', () => {
            let userId;

            before(() => {
                UserDataService.setModel(TestUser, "TestUserModel");
            });

            after(() => {
                UserDataService.setModel(User, "UserModel");
                TestUser.collection.drop();
            });

        describe('addUser()', () => {
            let user;
            before(() => {
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

            it('returns a promise that resolves to the saved user', () => {
                let promise = UserDataService.addUser(user);
                expect(promise).to.be.a('Promise');
                return promise.then(user => {
                    userId = user._id;
                    expect(user).to.exist;
                    expect(user).to.be.an('object');
                    expect(user).to.have.property('_id');
                    expect(user.name).to.have.property('full')
                });
            });

        });

        describe('removeUser()', () => {
            it('returns a promise that resolves to the removed user', () => {
                let promise = UserDataService.removeUser(userId);
                expect(promise).to.be.a('Promise');
                return promise.then(user => {
                    expect(user).to.exist;
                    expect(user).to.be.an('object');
                    expect(user).to.have.property('_id');
                    expect(user.name).to.have.property('full')
                    expect(user._id).to.eql(userId);
                });
            });

        });
    });
});
