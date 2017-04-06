import * as AuthController from './auth.controller';

function authRoute(app) {
    app.post('/api/login', AuthController.login);
}

export { authRoute }
