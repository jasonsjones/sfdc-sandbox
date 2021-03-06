import chai from 'chai';
import sinon from 'sinon';
import * as IndexController from './index.controller';

const expect = chai.expect;

describe('Index Controller', function () {
    let res = {};
    beforeEach(function () {
        res.json = sinon.spy()
    });

    it('getIndex() calls res.json()', function (done) {
        IndexController.getIndex(null, res, () => {
            expect(res.json.calledOnce).to.be.true;
            done();
        });
    });

    it('getIndex() calls res.json() with object', function (done) {
        IndexController.getIndex(null, res, () => {
            let resObject = res.json.args[0][0];
            expect(res.json.calledOnce).to.be.true;
            expect(resObject).to.have.property('message').that.is.a('string');
            expect(resObject).to.have.property('version').that.is.a('number');
            done();
        });
    });
});
