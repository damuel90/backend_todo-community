import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const auth = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(403).send({
            status: 401,
            message: 'No tienes autorización'
        });
    } 
    const token = req.headers.authorization.split(' ')[1]; //realizamos el Bearer para obtener el token
    verify(token, JWT_SECRET, function(err, decodedToken){
        if(err){
            res.status(403).send({
                status: 403,
                message: 'El token es inválido'
            });
        }
        req.user = decodedToken.user;
        next()
    });
};

export default auth;