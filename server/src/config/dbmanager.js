const debug = require('debug')('sfdc:dbmanager');

import mongoose from 'mongoose';
import config from './config';

export default function () {

    mongoose.Promise = global.Promise;
    let na44;
    let devmain;

    function createConnection(name) {
        if (name === 'dev') {
            debug(`**** creating db connection to ${config.db.dev.name}`);
            let na44ConnUrl = `mongodb://${config.db.host}/${config.db.dev.name}`;
            let devConn = mongoose.createConnection(na44ConnUrl);
            initHandlers(devConn, 'na44');
            return devConn;
        } else if (name === 'test') {
            debug(`**** creating db connection to ${config.db.test.name}`);
            let devmainConnUrl = `mongodb://${config.db.host}/${config.db.test.name}`;
            let testConn = mongoose.createConnection(devmainConnUrl);
            initHandlers(testConn, 'devmain');
            return testConn;
        }
    }

    return {
        getDevConnection: function () {
            if (!na44) {
                na44 = createConnection('dev');
            }
            return na44;
        },
        getTestConnection: function () {
            if (!devmain) {
                devmain = createConnection('test');
            }
            return devmain;
        }
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
    initProcessHandlers(conn, dbname);
}

function initProcessHandlers(conn, dbname) {
    debug(`*** removing all listeners for SIGINT and SIGUSR2 from ${dbname}`);
    process.removeAllListeners('SIGINT').removeAllListeners('SIGUSR2');

    debug(`*** adding listeners for SIGINT and SIGUSR2 on ${dbname}`);
    process.once('SIGUSR2', () => {
        gracefulShutdown('nodemon restart', conn, () => {
            process.kill(process.pid, 'SIGUSR2');
        });
    });

    process.once('SIGINT', () => {
        gracefulShutdown('app termination', conn, () => {
            process.exit(0);
        });
    });
    debug(`*** listeners added on ${dbname}`);
}

function gracefulShutdown(msg, connection, callback) {
    connection.close(function () {
        debug(`Mongoose disconnected through ${msg}`);
        callback();
    });
}
