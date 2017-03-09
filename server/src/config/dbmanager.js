const debug = require('debug')('sfdc:dbmanager');

import mongoose from 'mongoose';
import config from './config';

export default function () {

    mongoose.Promise = global.Promise;

    let na44 = mongoose.createConnection('mongodb://' + config.db.host + '/' + config.db.dev.name);
    initHandlers(na44, 'na44');

    return {
        na44: na44
    }
}

function initHandlers(conn, dbname) {
    conn.once('open', function () {
        debug(`Connected to mongo container ${dbname}`);
    });
    conn.on('error', console.error.bind(console, 'connection error'));
    conn.on('disconnected', () => {
        debug(`Mongoose disconnected from ${dbname}`);
    });
    initProcessHandlers(conn);
}

function initProcessHandlers(conn) {
    debug('*** removing all listeners from SIGINT and SIGUSR2')
    process.removeAllListeners('SIGINT').removeAllListeners('SIGUSR2');

    debug('*** adding listeners from SIGINT and SIGUSR2');
    process.on('SIGUSR2', () => {
        console.log('*** in the SIGUSR2 callback; node restarting...');
        gracefulShutdown('nodemon restart', conn, () => {
            process.kill(process.pid, 'SIGUSR2');
        });
    });

    process.once('SIGINT', () => {
        gracefulShutdown('app termination', conn, () => {
            process.exit(0);
        });
    });
    debug('*** adding listeners complete...');
}

function gracefulShutdown(msg, conn, callback) {
    conn.close(() => {
        debug(`Mongoose disconnected through ${msg}`);
        callback();
    })
}
