import chai from 'chai';
import chaiHttp from 'chai-http';

import '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = 'http://localhost:3000';

describe('Index Route', () => {

    describe('GET /', () => {

        it('returns json with status code 200', done => {
            chai.request(baseUrl)
                .get('/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('returns json with message property that is a string', done => {
            chai.request(baseUrl)
                .get('/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').that.is.a('string');
                    done();
                });
        });
    });

    describe('GET /notFound', () => {

        it('returns status code 404 when navigating to an unknown page', done => {
            chai.request(baseUrl)
                .get('/notFound')
                .end((err, res) => {
                    expect(err).to.exist
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

});
