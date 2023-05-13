import jwt from 'jsonwebtoken';

// id is the user _id. Adding this _id with jwt payload.
const generateToken = (id) => {
    // .sing have three arguments. sing(payload, secret, options)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

export default generateToken;