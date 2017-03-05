import chai from 'chai';
import DBManager from './dbmanager';

const expect = chai.expect;
const dbManager = DBManager();

describe('Database Manager', () => {
    it('has a na44 property', () => {
        expect(dbManager.na44).to.exist;
    })
});
