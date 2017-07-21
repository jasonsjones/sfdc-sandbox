import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const avatarSchema = new Schema({
    fileName: String,
    contentType: String,
    data: Buffer,
    defaultImg: Boolean
});

const Avatar = mongoose.model('Avatar', avatarSchema);

export { Avatar };
