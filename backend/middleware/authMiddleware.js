import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// Model
import userData from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Passed all the information of the user in the request object.
            req.user = await userData.findById(decoded.id);
        } catch (error) {
            console.error(error);
            res.status(401) // 401 means unauthorized
            throw new Error('Not authorize, token failed')
        }
    }

    if (!token) {
        res.status(401) // 401 means unauthorized
        throw new Error('Not authorize, no token')
    }

    next()
})

export default protect;
