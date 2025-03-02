import jwt from  'jsonwebtoken';
export const SECRET_KEY = process.env.SECRET_KEY;
export const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

