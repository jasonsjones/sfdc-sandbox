import * as UserController from './user.controller';

function userRoute(app) {
    app.get('/api/users', UserController.getAllUsers);
    app.post('/api/users', UserController.addUser);
}

export { userRoute }
