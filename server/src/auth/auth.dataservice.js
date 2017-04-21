import config from '../config/config';
import { User } from '../user/user.model';
import * as jwt from 'jsonwebtoken';

function login(user) {
    return new Promise((resolve, reject) => {
        if (!user.username || !user.password) {
            return resolve({
                authenticated: false,
                message: 'Username and password are required',
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
                        token = jwt.sign(dbUser._id, config.tokenSecret, {
                            expiresIn: '24h'
                        });
                        resolve({
                            authenticated: isAuthenticated,
                            message: 'User authenticated',
                            payload: {
                                user: dbUser,
                                token: token
                            }
                        });
                    } else {
                        resolve({
                            authenticated: isAuthenticated,
                            message: 'User not authenticated',
                            payload: {
                                user: null,
                                token: token
                            }
                        });

                    }
                } else {
                    resolve({
                        authenticated: false,
                        message: 'User not found',
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
