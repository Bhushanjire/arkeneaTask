const mongoose = require('mongoose');

const Mongoose = mongoose.Schema;

const UserSchema = new Mongoose({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    emailId: {
        type: String,
        required: [true, 'Email ID name is required'],
        unique: true
    },
    mobileNo: {
        type: String,
        required: [true, 'Mobile No. is required'],
    },
    photo: {
        type: String,
    }
});

let user = mongoose.model('Users', UserSchema);
module.exports = user;