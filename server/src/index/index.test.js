import chai from 'chai';
import chaiHttp from 'chai-http';

//import app from '../config/app';

chai.use(chaiHttp);
//const expect = chai.expect;

describe('Index Route', () => {

    describe('GET /', () => {

        it('returns json with status code 200');

        it('returns json with message property that is a string');
    });

    describe('GET /notFound', () => {

        it('returns status code 404 when navigating to an unknown page');
    });

});
