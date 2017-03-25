const debug = require('debug')('sfdc:databaseSeed');
import * as UserDataservice from './users/user.dataservice';

export default function () {
    debug('seeding database with users if required...');
    UserDataservice.seedDatabase()
        .then(UserDataservice.seedUsersInDb)
        .then()
        .catch(err => console.log(err));
}
