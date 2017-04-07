import { User } from '../users/user.model';

function login(user) {
    return new Promise((resolve, reject) => {
        if (!user.username || !user.password) {
            return resolve({
                authenticated: false,
                payload: null
            });
        }

        User.findOne({'local.username': user.username})
            .exec()
            .then(dbUser => {
                if (dbUser) {
                    let isAuthenticated = dbUser.verifyPassword(user.password);
                    resolve({
                        authenticated: isAuthenticated,
                        payload: dbUser
                    });
                } else {
                    resolve({
                        authenticated: false,
                        payload: null
                    });
                }
            })
            .catch(err => {
                reject(err)
            });
    });
}

export { login }
