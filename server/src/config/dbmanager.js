import mongoose from 'mongoose';
import config from './config';

export default function () {

    let na44 = mongoose.createConnection('mongodb://' + config.db.host + '/' + config.db.dev.name);
    initHandlers(na44);

    return {
        na44: na44
    }
}

function initHandlers(conn) {
    conn.once('open', function () {
        console.log('connected to mongo container...');
    });
    conn.on('error', console.error.bind(console, 'connection error'));
    conn.on('disconnected', () => {
        console.log(`Mongoose disconnected`);
    });
    initProcessHandlers(conn);
}

function initProcessHandlers(conn) {
    process.removeAllListeners('SIGINT').removeAllListeners('SIGUSR2');
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
}

function gracefulShutdown(msg, conn, callback) {
    conn.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    })
}
