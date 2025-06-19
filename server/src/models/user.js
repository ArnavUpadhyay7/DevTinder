const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    lastname: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value){
            if (validator.isEmail(value) === false){
                throw new Error('Invalid email format');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        validate(value){
            if (!validator.isStrongPassword(value)){
                throw new Error('Password is weak, just like you.');
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    photoURL: {
        type: String,
        default: 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg',
        validate(value){
            if (!validator.isURL(value)){
                throw new Error('Invalid image URL');
            }
        }
    },
    about: {
        type: String,
    },
    skills: {
        type: [String],
    },
},
{
    timestamps: true
});

// hash pass here before saving 

const User = mongoose.model('User', userSchema);
module.exports = User;