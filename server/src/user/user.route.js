import * as UserController from './user.controller';
import { Avatar } from '../avatar/avatar.model';
import multer from 'multer';
import fs from 'fs';

function userRoute(app) {
    app.route('/api/users')
        .get(UserController.getUsers)
        .post(UserController.addUser);

    app.route('/api/user/:id')
        .get(UserController.getUser)
        .patch(UserController.patchUser)
        .delete(UserController.removeUser);

    app.route('/api/user/avatar')
        .post(multer({dest: './uploads/'}).single('avatar'), function (req, res) {
            let avatar = new Avatar();
            avatar.fileName = req.file.originalname;
            avatar.contentType = req.file.mimetype;
            avatar.defaultImg = true;
            avatar.data = fs.readFileSync(req.file.path);
            avatar.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                fs.unlinkSync(req.file.path);
                res.json({message: 'avatar uploaded and saved...'});
            });
        });
}

export { userRoute }
