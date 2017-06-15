import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import DbManager from '../config/dbmanager';

const devConnection = DbManager().getDevConnection();
const testConnection = DbManager().getTestConnection();

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const defaultPassword = 'p@ssw0rd';

const userSchema = new Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    displayName: {type: String, default: ''},
    bio: {type: String, default: ''},
    email: {type: String, required: true},
    avatar: {type: String, default: ''},
    local: {
        username: {type: String, required: true},
        password: {type: String, default: defaultPassword}
    },
    admin: {type: Boolean, default: false},
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdDate: {type: Date, default: Date.now()},
    lastModifiedDate: {type: Date, default: Date.now()}
});

// execute before each user.save() call
userSchema.pre('save', function (callback) {
    let user = this;
    user.lastModifiedDate = Date.now();

    // early return if the password is not modified
    if (!user.isModified('local.password')) {
        return callback();
    }

    // the password has changed, so we need to hash it before saving
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return callback(err);
        }

        bcrypt.hash(user.local.password, salt, null, (err, hash) => {
            if (err) {
                return callback(err);
            }
            user.local.password = hash;
            callback();
        });
    });
});

userSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});

userSchema.set('toJSON', {virtuals: true});
userSchema.set('toObject', {virtuals: true});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.follow = function (id) {
    if (this.following.indexOf(id) === -1) {
        this.following.push(id);
    }
    return this.save();
}

userSchema.methods.toAuthJSON = function () {
    return {
        id: this._id,
        firstName: this.name.first,
        lastName: this.name.last,
        displayName: this.displayName,
        email: this.email,
        username: this.local.username,
        avatar: this.avatar,
        admin: this.admin
    };
}

userSchema.methods.toJSONObj = function () {
    let user = this.toObject();
    delete user.local.password;
    return user;
};

const User = devConnection.model('User', userSchema);
const TestUser = testConnection.model('User', userSchema);

export { User, TestUser }
