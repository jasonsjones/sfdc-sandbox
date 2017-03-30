import * as UserController from './user.controller';

function userRoute(app) {
    app.route('/api/users')
        .get(UserController.getUsers)
        .post(UserController.addUser);

    app.route('/api/user/:id')
        .get(UserController.getUser)
        .delete(UserController.removeUser);
}

export { userRoute }
