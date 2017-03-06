import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import initRoutes from './routes';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));

initRoutes(app);

export default app;
