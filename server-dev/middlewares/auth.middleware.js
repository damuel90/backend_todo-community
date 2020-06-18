import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        res.status(401).send({
            status: 401,
            message: 'El token no fue enviado'
        });
    }

    verify(token, JWT_SECRET, function(err, decodedToken){
        if(err){
            res.status(401).send({
                status: 401,
                message: 'El token es inválido'
            });
        }
        req.user = decodedToken.user;
        next()
    });
};

export default auth;