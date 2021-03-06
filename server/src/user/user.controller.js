import * as UserDataService from './user.dataservice';

function getUsers(req, res, next) {
    UserDataService.getUsers()
        .then(users => {
            res.json({
                success: true,
                payload: users
            });
            next();
        })
        .catch(err => {
            next(err);
        });
}

function getUser(req, res, next) {
    UserDataService.getUser(req.params.id)
        .then(user => {
            res.json({
                success: true,
                payload: user
            });
            next();
        })
        .catch(err => {
            next(err);
        });
}

function addUser(req, res, next) {
    // TODO: need to check if there is already a user created with the
    // username provided

    UserDataService.addUser(req.body)
        .then(user => {
            res.status(201);
            res.json({
                success: true,
                payload: user
            });
            next();
        })
        .catch(err => {
            next(err);
        });
}

function patchUser(req, res, next) {

    if (req.body.local && req.body.local.password) {
        delete req.body.local.password;
    }

    UserDataService.patchUser(req.params.id, req.body)
        .then(user => {
            res.json({
                success: true,
                payload: user
            });
            next();
        })
        .catch(err => {
            next(err);
        });
}

function removeUser(req, res, next) {
    UserDataService.removeUser(req.params.id)
        .then(user => {
            res.json({
                success: true,
                payload: user
            });
            next();
        })
        .catch(err => {
            next(err);
        });
}

function followUser(req, res, next) {
    UserDataService.followUser(req.params.id, req.params.userIdToFollow)
        .then(user => {
            res.json({
                success: true,
                payload: user
            });
            next();
        })
        .catch(err => {
            next(err);
        });
}

export { addUser, getUsers, getUser, patchUser, removeUser, followUser }
