import * as AuthDataService from './auth.dataservice';

function login(req, res, next) {
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    next();
}

export { login }
