const debug = require('debug')('sfdc:dataservice');
import Factory from './user.datafactory';
import { User } from './user.model';

let UserModel = User;

function setModel(model, modelName) {
    debug(`**** switching user model to ${modelName}`);
    UserModel = model;
}

function getUsers() {
    return new Promise(function (resolve, reject) {
        UserModel.find({}).exec()
            .then(users => {
                resolve(users);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function addUser(user) {
    let newUser = new UserModel(user);
    return new Promise(function (resolve, reject) {
        newUser.save()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            });

    });
}

function seedDatabase() {
    return new Promise(function (resolve, reject) {
        UserModel.find({}).exec()
            .then(users => {
                if (users.length === 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

function seedUsersInDb(noUsersInDb) {
    return new Promise(function (resolve, reject) {
        if (noUsersInDb) {
            const users = Factory().getUsers();
            debug('need to seed users in database...');
            users.forEach((user, idx, arr) => {
                if (idx === arr.length - 1) {
                    debug(`user at the end off the array is ${user.name.last}`);
                    resolve({
                        success: true,
                        message: 'users seeded in database'
                    });
                }
            })
        } else {
            debug('users in database, no need to seed');
        }
    });
}

export { addUser, getUsers, seedDatabase, seedUsersInDb, setModel }
