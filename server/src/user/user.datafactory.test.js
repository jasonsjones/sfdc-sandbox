import  chai from 'chai';

import factory from './user.datafactory';

const expect = chai.expect;

const userFactory = factory();

describe('User Data Factory', function () {
    it('exists', function () {
        expect(userFactory).to.exist;
    });

    describe('getUsers()', function () {

        it('returns an array of users', function () {
            expect(userFactory.getUsers()).to.be.an('array');
            let user = userFactory.getUsers()[0];
            expect(user).to.have.property('name');
            expect(user).to.have.property('local');
            expect(user).to.have.property('email');
            expect(user).to.have.property('admin');
            expect(user).to.have.property('createdDate');
        });

    });

    describe('mockUsersFromServer()', function () {
        it('returns an array of users', function () {
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
