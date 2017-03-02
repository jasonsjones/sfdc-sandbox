import chai from 'chai';
import * as IndexDataService from './index.dataservice';

const expect = chai.expect;

describe('Index DataService', () => {

    it('getWelcomeMessage returns a Promise', () => {
       var result = IndexDataService.getWelcomeMessage();
       expect(result).to.be.a('Promise');
    });

});
