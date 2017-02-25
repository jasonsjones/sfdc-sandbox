const debug = require('debug')('sfdc:server');

import config from './config/config';
import app from './config/app';
import './config/routes';

app.listen(config.port, () => {
    debug(`server running in container on port ${config.port}`);
})