import  chai from 'chai';

import factory from './user.datafactory';

const expect = chai.expect;

const userFactory = factory();

describe('User Data Factory', () => {
    it('exists', () => {
        expect(userFactory).to.exist;
    });

    describe('getUsers()', () => {

        it('returns an array of users', () => {
            expect(userFactory.getUsers()).to.be.an('array');
            let user = userFactory.getUsers()[0];
            expect(user).to.have.property('name');
            expect(user).to.have.property('local');
            expect(user).to.have.property('email');
            expect(user).to.have.property('admin');
            expect(user).to.have.property('createdDate');
        });

    });

    describe('mockUsersFromServer()', () => {
        it('returns an array of users', () => {
            expect(userFactory.mockUsersFromServer()).to.be.an('array');
            let user = userFactory.mockUsersFromServer()[0];
            expect(user).to.have.property('_id');
            expect(user).to.have.property('__v');
            expect(user).to.have.property('name');
            expect(user.name).to.have.property('full');
            expect(user).to.have.property('local');
            expect(user).to.have.property('email');
            expect(user).to.have.property('admin');
            expect(user).to.have.property('createdDate');
        });

    });

});
