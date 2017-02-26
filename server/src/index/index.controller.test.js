import chai from 'chai';
import sinon from 'sinon';
import * as IndexController from './index.controller';

const expect = chai.expect;

describe('Index controller', () => {
    let res = {};
    beforeEach(() => {
        res.json = sinon.spy()
    });
    
    it('getIndex() calls res.json()', () => {
        IndexController.getIndex(null, res);
        expect(res.json.calledOnce).to.be.true;
    });

    it('getIndex() calls res.json() with message', () => {
        let resObj = {message: 'Welcome to the SFDC Sandbox!'};

        IndexController.getIndex(null, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.calledWith(resObj)).to.be.true;
    });
});