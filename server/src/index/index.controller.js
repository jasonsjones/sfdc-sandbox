import * as IndexDataService from './index.dataservice';

export function getIndex(req, res, next) {
    IndexDataService.getWelcomeMessage()
        .then(message => {
            res.json(message);
            next();
        });
}
