import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
});

// This method works for matching encrypted passwords at login time.
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// This middleware work is encrypted passwords before creating a new user. 
userSchema.pre('save', async function (next) {
    // This part works, when we don't send passwords 
    if (!this.isModified('password')) {
        next();
    }
    // This part works, when we send passwords 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const userData = mongoose.model('userData', userSchema, 'userData');

export default userData;