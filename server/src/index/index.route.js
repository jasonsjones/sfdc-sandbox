import * as IndexController from './index.controller';

function indexRoute(app) {
    app.get('/api', IndexController.getIndex);
}

export { indexRoute }
