import { indexRoute } from '../index/index.route';
import { userRoute } from '../user/user.route';
import { authRoute } from '../auth/auth.route';

export default function (app) {
    indexRoute(app);
    userRoute(app);
    authRoute(app);
}
