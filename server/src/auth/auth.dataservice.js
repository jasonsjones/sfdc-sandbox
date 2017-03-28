import { User } from '../users/user.model';

function login(user) {
    return new Promise((resolve, reject) => {
       User.findOne({'local.username': user.username})
            .exec()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err)
            });
    });
}

export { login }
