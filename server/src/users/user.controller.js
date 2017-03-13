import { User } from './user.model';

function getAllUsers(req, res, next) {
    User.find({}, '-local.password', function (err, users) {
        if (err) {
            res.status(500).send(err);
            next(err);
        } else if (users) {
            res.json({success: true, users: users});
        } else {
            res.json({success: false, msg: 'No users in database'});
        }
        next();
    });
}

function addUser(req, res, next) {
    // TODO: need to check if there is already a user created with the
    // username provided
    var newUser = new User(req.body);

    newUser.save(function (err, user) {
        if (err) {
            res.status(500).send(err);
            next(err);
        }
        res.status(201).json({
            success: true,
            user: user
        });
        next();
    });
}

export { addUser, getAllUsers }
