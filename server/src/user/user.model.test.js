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
        let mockUserData;
        let mockUser;
        before(function (done) {
            mockUserData = {
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
});
