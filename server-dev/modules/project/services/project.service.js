import { ProjectRepository } from '../repositories';
import { showError, verifyParams } from '../../../helpers';

const isManager = async (projectId, userId) => {
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        return [false, 'El projecto no existe'];
    }
    const manager = project.imManager(userId);
    if(!manager){
        return [false, 'No tiene las credenciales para realizar esta acción'];
    }
    return [true];
};

const isCreator = async (projectId, userId) => {
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        return [false, 'El projecto no existe'];
    }
    const creator = project.imCreator(userId);
    if(!creator){
        return [false, 'No tiene las credenciales para realizar esta acción'];
    }
    return [true];
};

const create = async (project) => {
    return await ProjectRepository.create(project);
};

const getPublicProjects = async () => {
    return await ProjectRepository.getAllPublic();
};

const getUserProjects = async (userId) => {
    if(!userId){
        throw showError(400, 'No envió el userId')
    }
    return await ProjectRepository.getByUser(userId);
};

const update = async (projectId, userId, data) => {
    const [exists, paramError] = verifyParams({ projectId, userId, data });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(projectId, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    return await ProjectRepository.update(projectId, data);
};

const changeToManager = async (projectId, userId, collaboratorId) => {
    const [exists, paramError] = verifyParams({ projectId, userId, collaboratorId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [creator, creatorError] = await isCreator(projectId, userId);
    if(!creator){
        throw showError(500, creatorError)
    }
    const addedManager = await ProjectRepository.changeToManager(projectId, collaboratorId);
    if(!addedManager){
        throw showError(500, 'El usuario ya tiene credenciales de administrador');
    }
    return addedManager;
};

const changeToCollaborator = async (projectId, userId, collaboratorId) => {
    const [exists, paramError] = verifyParams({ projectId, userId, collaboratorId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [creator, creatorError] = await isCreator(projectId, userId);
    if(!creator){
        throw showError(500, creatorError)
    }
    const addedCollaborator = await ProjectRepository.changeToCollaborator(projectId, collaboratorId);
    if(!addedCollaborator){
        throw showError(500, 'El usuario ya no tiene credenciales de administrador');
    }
    return addedCollaborator;
};

const removeCollaborator = async (projectId, userId, collaboratorId) => {
    const [exists, paramError] = verifyParams({ projectId, userId, collaboratorId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [creator, creatorError] = await isCreator(projectId, userId);
    if(!creator){
        throw showError(500, creatorError)
    }
    const removedCollaborator = await ProjectRepository.removeCollaborator(projectId, collaboratorId);
    if(!removedCollaborator){
        throw showError(500, 'El usuario ya no colabora en el proyecto');
    }
    return removedCollaborator;
};

const remove = async (projectId, userId) => {
    const [exists, paramError] = verifyParams({ projectId, userId });
    if(!exists){
        throw showError(400, paramError);
    }
    const removedProject = await ProjectRepository.remove(projectId, userId);
    if(!removedProject){
        throw showError(500, 'El proyecto no existe o no tiene las credenciales para realizar la acción');
    }
    return removedProject;
};

export {
    isManager,
    isCreator
};

export default {
    create,
    getPublicProjects,
    getUserProjects,
    update,
    removeCollaborator,
    changeToManager,
    changeToCollaborator,
    remove
};