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

function addUser(req, res, next) {
    // TODO: need to check if there is already a user created with the
    // username provided

    UserDataService.addUser(req.body)
        .then(user => {
            res.status(201).json({
                success: true,
                payload: user
            });
            next();
        })
        .catch(err => {
            res.status(500).send(err);
            next(err);
        });
}

export { addUser, getUsers }
