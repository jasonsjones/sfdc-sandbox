import chai from 'chai';

import { TestUser as User } from './user.model';
import factory from './user.datafactory';

const expect = chai.expect;
const userFactory = factory();

describe('User Model', function () {

    describe('save()', function () {

        let mockUserData, mockUser, savedUser, error;

        before(function (done) {
            mockUserData = userFactory.getUsers()[0];
            delete mockUserData.createdDate;
            delete mockUserData.admin;

            mockUser = new User(mockUserData);
            mockUser.save(function (err, user) {
                error = err;
                savedUser = user;
                done();
            });
        });

        after(function () {
            User.collection.drop();
        });

        it('does not return an error', function () {
            expect(error).to.not.exist;
            expect(savedUser).to.exist;
        });

        it('adds admin property as false by default', function () {
            expect(savedUser.admin).to.be.false;
        });

        it('adds createdDate property by default', function () {
            expect(savedUser.createdDate).to.exist;
        });

        it('adds lastModifiedDate property by default', function () {
            expect(savedUser.lastModifiedDate).to.exist;
        });

        it('stores a hashed password', function () {
            expect(savedUser.local.password).to.not.equal(mockUserData.local.password);
        });
    });

    describe('verifyPassword()', function () {
        let mockUser;
        before(function (done) {
            var mockUserData = {
                name: {
                    first: 'Oliver',
                    last: 'Queen'
                },
                email: 'oliver@queenconsolidated.com',
                bio: 'A billionaire turned superhero',
                displayName: 'Oliver Queen',
                avatar: 'avatar8.png',
                local: {
                    username: 'arrow',
                    password: 'p@ssw0rd'
                }
            };
            mockUser = new User(mockUserData);
            mockUser.save(function () {
                done();
            });
        });

        after(function () {
            User.collection.drop();
        });

        it('returns false with the wrong password', function () {
            let result = mockUser.verifyPassword('wrongP@ssword');
            expect(result).to.be.false;
        });

        it('returns true with the correct password', function () {
            let result = mockUser.verifyPassword('p@ssw0rd');
            expect(result).to.be.true;
        });
    });

    describe.only('follow() and unfollow()', function () {
        let theUser;
        let idToFollow;
        before(function (done) {
            let user = userFactory.getUsers()[0];
            let userToFollow = userFactory.getUsers()[1];
            Promise.all([addUser(user), addUser(userToFollow)])
                .then(function (response) {
                    theUser = response[0];
                    idToFollow = response[1]._id;
                    done();
                });
        });

        after(function () {
            User.collection.drop();
        });

        it('adds the id of the user to follow', function () {
            theUser.follow(idToFollow);
            expect(theUser.following.length).to.equal(1);
            expect(theUser.following[0]).to.equal(idToFollow);
        });

        it('does not add a user if already following', function () {
            theUser.follow(idToFollow);
            theUser.follow(idToFollow);
            expect(theUser.following.length).to.equal(1);
            expect(theUser.following[0]).to.equal(idToFollow);
        });

        it('unfollows a user that was previously followed', function () {
            theUser.follow(idToFollow);
            expect(theUser.following.length).to.equal(1);

            theUser.unfollow(idToFollow);
            expect(theUser.following.length).to.equal(0);
        });

    });
});

function addUser(userData) {
    delete userData.createdDate;
    delete userData.lastModifiedDate;
    return new Promise(function (resolve, reject) {
        new User(userData).save(function (err, user) {
            if (err) {
                reject(err);
                return;
            }
            resolve(user);
        })
    });

}
