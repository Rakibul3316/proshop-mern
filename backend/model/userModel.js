import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email id is required'],
        unique: [true, 'Duplicate email address is not allowed']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: true
    },
}, {
    timestamps: true
})

const userData = mongoose.model('userData', userSchema, 'userData');

export default userData;