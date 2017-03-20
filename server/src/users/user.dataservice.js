import { User } from './user.model';

function getUsers() {
    return new Promise(function (resolve, reject) {
        User.find({}).exec()
            .then(users => {
                resolve(users);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export { getUsers }
