import * as AuthDataService from './auth.dataservice';

function login(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.json({
            success: false,
            message: 'Username and password are required',
            payload: null
        });
        next();
        return;
    }

    let user = {
        username: req.body.username,
        password: req.body.password
    };

    AuthDataService.login(user)
        .then(response => {
            if (response.authenticated && response.payload) {
                res.json({
                    success: true,
                    message: 'User authenticated',
                    payload: response.payload
                });
            } else if (!response.authenticated && response.payload) {
                res.json({
                    success: false,
                    message: 'User not authenticated',
                    payload: null
                });
            }
            next();
        })
        .catch(err => {
            next(err);
        });
}

export { login }
