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

});
