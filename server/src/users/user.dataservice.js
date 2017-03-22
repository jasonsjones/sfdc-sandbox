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

export { addUser, getUsers, setModel }
