const debug = require('debug')('sfdc:server');

import config from './config/config';
import app from './config/app';
import dbSeed from './databaseSeed';

dbSeed();

app.listen(config.port, () => {
    debug(`node server running in container on port ${config.port}`);
});
