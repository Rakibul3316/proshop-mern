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

// @desc        Update user profile
// @route       PUT /api/users/profile/update
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
    // This user information is passed in request in auth middleware.
    const user = await userData.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404) // Not Found
        throw new Error('User not found.')
    }

})

// @desc        Get all users
// @route       GET /api/users
// @access      Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await userData.find({});
    res.json(users);
})

// @desc        Delete a user
// @route       DELETE /api/users/:id
// @access      Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await userData.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User delete successfully!' })
    } else {
        res.status(404)
        throw new Error('User not found');
    }
})

// @desc        Get user by Id
// @route       GET /api/users/:id
// @access      Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await userData.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404)
        throw new Error('User not found');
    }
})

// @desc        Update user by admin
// @route       PUT /api/users/:id
// @access      Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const user = await userData.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    } else {
        res.status(404) // Not Found
        throw new Error('User not found.')
    }

})

export {
    getUser,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUserByAdmin
};