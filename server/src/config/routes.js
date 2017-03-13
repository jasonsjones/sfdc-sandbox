import { indexRoute } from '../index/index.route';
import { userRoute } from '../users/user.route';

export default function (app) {
    indexRoute(app);
    userRoute(app);
}
