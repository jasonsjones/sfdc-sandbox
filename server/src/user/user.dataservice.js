const debug = require('debug')('sfdc:dataservice');
const faker = require('faker');
import Factory from './user.datafactory';
import { User } from './user.model';

let UserModel;
setModel(User);

function setModel(model, modelName) {
    debug(`**** assigning user model to ${modelName}`);
    UserModel = model;
}

function getUsers() {
    return new Promise(function (resolve, reject) {
        UserModel.find({}, '-local.password').exec()
            .then(users => {
                resolve(users);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getUser(id) {
    return new Promise(function (resolve, reject) {
        UserModel.findById(id, '-local.password').exec()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            });
    });

}

function getRandomUser() {
    return Promise.resolve(
        {
            id: faker.random.number(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            displayName: faker.name.findName(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            avatar: 'male4.png',
            admin: faker.random.boolean()
        }
    );
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

function patchUser(id, patchedUser) {
    return new Promise(function (resolve, reject) {
        UserModel.findByIdAndUpdate(id, patchedUser, {new: true}).exec()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function removeUser(id) {
    return new Promise(function (resolve, reject) {
        UserModel.findByIdAndRemove(id).exec()
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
                UserModel.create(user, function (err) {
                    if (err) {
                        reject({
                            success: false,
                            message: 'error seeding users in database'
                        });
                    }
                    if (idx === arr.length - 1) {
                        resolve({
                            success: true,
                            message: 'users seeded in database'
                        });
                    }
                });
            });
        } else {
            debug('There are users in the database; seeding NOT required');
        }
    });
}

export { addUser, getUsers, getUser, getRandomUser, patchUser, removeUser,
         seedDatabase, seedUsersInDb, setModel }
