import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Index Route', () => {

    describe('GET /', () => {

        let response;

        before( done => {
            chai.request(app)
                .get('/api')
                .end((err, res) => {
                    expect(err).to.be.null;
                    response = res;
                    done();
                });
        });

        it('returns json with status code 200', () => {
            expect(response).to.be.json;
            expect(response).to.have.status(200);
        });

        it('returns json with message property that is a string', () => {
            expect(response.body).to.have.property('message').that.is.a('string');
            expect(response.body.message).to.be.ok;
        });

        it('returns json with version property that is a number', () => {
            expect(response.body).to.have.property('version').that.is.a('number');
            expect(response.body.version).to.be.ok;
        });
    });

    describe('GET /notFound', () => {

        it('returns status code 404 when navigating to an unknown page', done => {
            chai.request(app)
                .get('/notFound')
                .end((err, res) => {
                    expect(err).to.exist
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

});
