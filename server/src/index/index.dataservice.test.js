import chai from 'chai';
import * as IndexDataService from './index.dataservice';

const expect = chai.expect;

describe('Index DataService', () => {

    it('getWelcomeMessage() returns a Promise', () => {
       var result = IndexDataService.getWelcomeMessage();
       expect(result).to.be.a('Promise');
    });

    it('getWelcomeMessage() resolves to an obj with a message property', () => {
        var result = IndexDataService.getWelcomeMessage();
        return result.then(data => {
            expect(data).to.have.property('message');
        });
    });

});
