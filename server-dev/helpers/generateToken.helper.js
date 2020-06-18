import { sign } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE } from '../config';

const generateToken = (user) => {
    return sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export default generateToken;