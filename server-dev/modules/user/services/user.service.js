import { UserRepository } from '../repositories';
import { showError, generateToken } from '../../../helpers';

const signup = async (user) => {
    const userDB = await UserRepository.getByEmail(user.email);

    if(userDB){
        throw showError(401, 'Ya existe un usuario con este correo electronico');
    }

    const createdUser = await UserRepository.create(user);

    const userToEncode = {
        userId: createdUser._id,
        email: createdUser.email,
        fullName: createdUser.fullName,
        avatar: createdUser.avatar
    }
    const token = generateToken(userToEncode);

    return { ...userToEncode, token };
};

const signin = async ({ email, password }) => {
    const userDB = await UserRepository.getByEmail(email);

    if(!userDB){
        throw showError(401, 'El correo electronico o la contraseña son incorrectos');
    }

    const validPassword = userDB.comparePassword(password);

    if(!validPassword){
        throw showError(401, 'El correo electronico o la contraseña son incorrectos');
    }

    const userToEncode = {
        userId: userDB._id,
        email: userDB.email,
        fullName: userDB.fullName,
        avatar: userDB.avatar
    }
    const token = generateToken(userToEncode);

    return { ...userToEncode, token };
};

const update = async (userId, data) => {
    if(!userId){
        throw showError(400, 'No envio el id del usuario');
    }

    const updatedUser = await UserRepository.update(userId, data);
    if(!updatedUser){
        throw showError(500, 'Ocurrió un erro o no tienes las credenciales para realizar esta acción');
    }
    return updatedUser;
};

export default {
    signup,
    signin,
    update
};