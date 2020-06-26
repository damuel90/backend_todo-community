import { UserService, UploadService } from '../services';

const signup = async (req, res) => {
    try {
        let { body, file } = req;
        if(file){
            const avatar = await UploadService.file(file);
            body = {...body, avatar};
        }
        const user = await UserService.signup(body);
        return res.status(201).send(user);
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.signin({ email, password });
        return res.status(201).send(user);
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const editAvatar = async (req, res) => {
    try {
        const { user, file } = req;
        const avatar = await UploadService.file(file);
        await UserService.update(user.userId, { avatar });
        return res.status(201).send({ avatar });
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const editFullname = async (req, res) => {
    try {
        const { userId } = req.user;
        const { fullName } = req.query;
        await UserService.update(userId, { fullName });
        return res.status(200).send({
            message: 'El nombre del usuario ha sido modificado con exito'
        });
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

export default {
    signup,
    signin,
    editAvatar,
    editFullname
}