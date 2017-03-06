const debug = require('debug')('sfdc:server');

import config from './config/config';
import app from './config/app';

app.listen(config.port, () => {
    debug(`node server running in container on port ${config.port}`);
});
