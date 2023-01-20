import generateToken from "../utils/generateToken.js";
import asyncHandler from 'express-async-handler';

// User Model
import userData from '../models/userModel.js';

// @desc        Auth user & get token
// @route       POST /api/users/login
// @access      Public
const getUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userData.findOne({ email });

    // matchPassword is a method, that is define in userModel. This method matchs the user entered password with database encrypted password and reutrn true or false.
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401) // 401 means unauthorized.
        throw new Error('Invalid email or password.')
    }
})

// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
    // This user information is passed in request in protected middleware.
    const user = await userData.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404) // Not Found
        throw new Error('User not found.')
    }

})

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await userData.findOne({ email });

    if (userExist) {
        res.status(400) // 400 means bad request.
        throw new Error('User already exist.');
    }

    const user = await userData.create({
        name,
        email,
        // password will encrypt automatically before creating a new user, using the pre-save middleware at the user model.
        password
    })

    if (user) {
        // 201 means Created.
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400) // 400 means bad request.
        throw new Error('Invalid user data');
    }
})

export { getUser, getUserProfile, registerUser };