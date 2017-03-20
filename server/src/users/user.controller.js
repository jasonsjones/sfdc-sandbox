import { User } from './user.model';
import * as UserDataService from './user.dataservice';

let UserModel = User;

function setModel(model, modelName) {
    console.log(`**** switching user model to ${modelName}`);
    UserModel = model;
}

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
    var newUser = new UserModel(req.body);

    newUser.save()
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

export { addUser, getUsers, setModel }
