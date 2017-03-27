const debug = require('debug')('sfdc:databaseSeed');
import * as UserDataservice from '../users/user.dataservice';

export default function () {
    UserDataservice.seedDatabase()
        .then(UserDataservice.seedUsersInDb)
        .then(result => {
            if (result.success) {
                debug('seeding database with users...');
            }
            debug(result.message);
        })
        .catch(err => debug(err.message));
}
