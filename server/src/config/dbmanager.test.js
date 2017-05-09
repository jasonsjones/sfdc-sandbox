import chai from 'chai';
import DBManager from './dbmanager';

const expect = chai.expect;
const dbManager = DBManager();

describe('Database Manager', function () {

    it('has a na44 property', function () {
        expect(dbManager.getDevConnection()).to.exist;
    });

    it('has a devmain property', function () {
        expect(dbManager.getTestConnection()).to.exist;
    });
});
