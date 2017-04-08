import config from '../config/config';
import { User } from '../users/user.model';
import * as jwt from 'jsonwebtoken';

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
                    let token = null;
                    if (isAuthenticated) {
                        token = jwt.sign(dbUser, config.tokenSecret, {
                            expiresIn: '24h'
                        });
                        resolve({
                            authenticated: isAuthenticated,
                            payload: {
                                user: dbUser,
                                token: token
                            }
                        });
                    } else {
                        resolve({
                            authenticated: isAuthenticated,
                            payload: {
                                user: null,
                                token: token
                            }
                        });

                    }
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
