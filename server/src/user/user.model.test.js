import chai from 'chai';

import { TestUser as User } from './user.model';
import factory from './user.datafactory';

const expect = chai.expect;
const userFactory = factory();

describe('User Model', () => {

    describe('save()', () => {

        let mockUserData, mockUser, savedUser, error;

        before((done) => {
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

        after(() => {
            User.collection.drop();
        });

        it('does not return an error', () => {
            expect(error).to.not.exist;
            expect(savedUser).to.exist;
        });

        it('adds admin property as false by default', () => {
            expect(savedUser.admin).to.be.false;
        });

        it('adds createdDate property by default', () => {
            expect(savedUser.createdDate).to.exist;
        });

        it('stores a hashed password', () => {
            expect(savedUser.local.password).to.not.equal(mockUserData.local.password);
        });
    });

    describe('verifyPassword()', () => {
        let mockUserData;
        let mockUser;
        before((done) => {
            mockUserData = {
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
            mockUser = new User(mockUserData);
            mockUser.save(function () {
                done();
            });
        });

        after(() => {
            User.collection.drop();
        });

        it('returns false with the wrong password', () => {
            let result = mockUser.verifyPassword('wrongP@ssword');
            expect(result).to.be.false;
        });

        it('returns true with the correct password', () => {
            let result = mockUser.verifyPassword('p@ssw0rd');
            expect(result).to.be.true;
        });
    });
});
