const moongoose = require('mongoose');
const { Schema, model } = moongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
    },
});

const User = model('User', userSchema);
module.exports = User; 