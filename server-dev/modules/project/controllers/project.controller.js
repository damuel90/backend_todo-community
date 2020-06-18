import { ProjectService } from '../services';

const create = async (req, res) => {
    try {
        let { body, user: { userId } } = req;
        body = {...body, creator: userId, managers: [ userId ]};
        const createdProject = await ProjectService.create(body);
        return res.status(201).send({
            status: 201,
            data: createdProject
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const getPublicProjects = async (req, res) => {
    try {
        const publicProjects = await ProjectService.getPublicProjects();
        return res.status(201).send({
            status: 201,
            data: publicProjects
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const getMyProjects = async (req, res) => {
    try {
        let { userId } = req.user;
        const myProjects = await ProjectService.getUserProjects(userId);
        return res.status(201).send({
            status: 201,
            data: myProjects
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const update = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, ...data } = req.body;
        await ProjectService.update(projectId, userId, data);
        return res.status(200).send({
            status: 200,
            message: 'El projecto se actualizó con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const changeToManager = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, collaboratorId } = req.body;
        await ProjectService.changeToManager(projectId, userId, collaboratorId);
        return res.status(200).send({
            status: 200,
            message: 'Ha dado credenciales de administrador a un colaborador'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const changeToCollaborator = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, collaboratorId } = req.body;
        await ProjectService.changeToCollaborator(projectId, userId, collaboratorId);
        return res.status(200).send({
            status: 200,
            message: 'Ha quitado las credenciales de administrador a un colaborador'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const removeCollaborator = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, collaboratorId } = req.body;
        await ProjectService.removeCollaborator(projectId, userId, collaboratorId);
        return res.status(200).send({
            status: 200,
            message: 'Ha expulsado a un colaborador del proyecto'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const remove = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId } = req.params;
        await ProjectService.remove(projectId, userId);
        return res.status(200).send({
            status: 200,
            message: 'Se ha eliminado el proyecto con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

export default {
    create,
    getPublicProjects,
    getMyProjects,
    update,
    removeCollaborator,
    changeToManager,
    changeToCollaborator,
    remove
};