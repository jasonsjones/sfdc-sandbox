import Factory from './user.datafactory';
import { User } from './user.model';

let UserModel = User;

function setModel(model, modelName) {
    console.log(`**** switching user model to ${modelName}`);
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

function areUsersInDatabase() {
    return new Promise(function (resolve, reject) {
        UserModel.find({}).exec()
            .then(users => {
                if (users.length === 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

function seedDatabase(isUsers) {
    return new Promise(function (resolve, reject) {
        if (!isUsers) {
            const users = Factory().getUsers();
            console.log('need to seed users in database...');
            resolve(users);
        } else {
            reject('users are present');
        }
    });
}

export { addUser, getUsers, seedDatabase, setModel }
