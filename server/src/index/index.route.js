import * as IndexController from './index.controller';

function indexRoute(app) {
    app.get('/', IndexController.getIndex);
}

export { indexRoute }