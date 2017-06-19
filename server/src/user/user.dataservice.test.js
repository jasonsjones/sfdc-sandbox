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

describe('User Data Service', function () {

    describe('getUsers()', function () {
       let UserMock;
        beforeEach(function () {
            UserMock = sinon.mock(User);
            UserMock.expects('find').withArgs({})
                .chain('exec')
                .resolves(mockedUsers);
        });

        afterEach(function () {
            UserMock.restore();
        });

        it('returns a promise', function () {
            let promise = UserDataService.getUsers();
            expect(promise).to.be.a('Promise');
        });

        it('resolves to an array of users', function () {
            var promise = UserDataService.getUsers();
            return promise.then(data => {
                expect(data).to.be.an('array');
                expect(data.length).to.equal(mockedUsers.length);
            });
        });
    });

    describe('getUser()', function () {
        let UserMock;
        let arrowId;

        beforeEach(function () {
            arrowId = mockedUsers[3]._id;
            UserMock = sinon.mock(User);
            UserMock.expects('findById').withArgs(arrowId)
                .chain('exec')
                .resolves(mockedUsers[3]);
        });

        afterEach(function () {
            UserMock.restore();
        });

        it('returns a promise', function () {
            let promise = UserDataService.getUser(arrowId);
            expect(promise).to.be.a('Promise');
        });

        it('resolves to a user', function () {
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

        it('rejects with error when user does not exit', function () {
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

    describe('getRandomUser()', function () {

        it('returns a promise', function () {
            let promise = UserDataService.getRandomUser();
            expect(promise).to.be.a('Promise');
        });

        it('resolves to a user', function () {
            var promise = UserDataService.getRandomUser();
            return promise.then(data => {
                expect(data).to.be.an('object');
                expect(data).to.have.property('email');
                expect(data).to.have.property('firstName');
                expect(data).to.have.property('lastName');
                expect(data).to.have.property('displayName');
                expect(data).to.have.property('username');
            });
        });
    });

    describe('add, patch, and remove user', function () {
            let userId;

            before(function () {
                UserDataService.setModel(TestUser, "TestUserModel");
            });

            after(function () {
                UserDataService.setModel(User, "UserModel");
                TestUser.collection.drop();
            });

        describe('addUser()', function () {
            let user;
            before(function () {
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

            it('returns a promise that resolves to the saved user', function () {
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

        describe('patchUser()', function () {
            let patchUser;
            before(function () {
                patchUser = {
                    email: 'arrow@queenconsolidated.com',
                };
            });

            it('returns a promise that resolves to the patched user', function () {
                let promise = UserDataService.patchUser(userId, patchUser);
                expect(promise).to.be.a('Promise');
                return promise.then(user => {
                    expect(user).to.exist;
                    expect(user).to.be.an('object');
                    expect(user).to.have.property('_id');
                    expect(user.name).to.have.property('full')
                    expect(user.email).to.equal(patchUser.email);
                });
            });

        });

        describe('removeUser()', function () {
            it('returns a promise that resolves to the removed user', function () {
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

    describe('followUser()', function () {
        let UserMock;
        let arrowId;
        let supermanId;

        beforeEach(function () {
            arrowId = mockedUsers[3]._id;
            supermanId = mockedUsers[0]._id;
            UserMock = sinon.mock(User);
            UserMock.expects('findById').withArgs(arrowId)
                .chain('exec')
                .resolves(new TestUser(mockedUsers[3]));
        });

        afterEach(function () {
            UserMock.restore();
        });

        it('returns a promise', function () {
            let stub = sinon.stub(TestUser.prototype, 'follow');
            let promise = UserDataService.followUser(arrowId, supermanId);
            expect(promise).to.be.a('Promise');
            return promise.then(user => {
                expect(user).to.exist;
                stub.restore();
            }, err => {
                expect(err).to.be.null;
            })
        });

    });

});
