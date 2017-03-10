import chai from 'chai';
import DBManager from './dbmanager';

const expect = chai.expect;
const dbManager = DBManager();

describe('Database Manager', () => {

    it('has a na44 property', () => {
        expect(dbManager.dev.connection).to.exist;
        dbManager.dev.connection.close();
    });

    it('has a devmain property', () => {
        expect(dbManager.test.connection).to.exist;
        dbManager.test.connection.close();
    });
});
