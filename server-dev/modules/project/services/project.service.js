import { ProjectRepository, TaskRepository, InvitationRepository } from '../repositories';
import { showError } from '../../../helpers';

const create = async (project) => {
    return await ProjectRepository.create(project);
};

const getPublicProjects = async () => {
    return await ProjectRepository.getAllPublic();
};

const getUserProjects = async (userId) => {
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    return await ProjectRepository.getByUser(userId);
};

const update = async (projectId, userId, data) => {
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    if(!projectId){
        throw showError(400, 'No envió el id del projecto')
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const manager = project.imManager(userId);
    if(!manager){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    return await ProjectRepository.update(projectId, data);
};

const changeToManager = async (projectId, userId, collaboratorId) => {
    if(!userId || !collaboratorId){
        throw showError(400, 'No envió el id del usuario');
    }
    if(!projectId){
        throw showError(400, 'No envió el id del projecto');
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const creator = project.imCreator(userId);
    if(!creator){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    const addedManager = await ProjectRepository.changeToManager(projectId, userId, collaboratorId);
    if(!addedManager){
        throw showError(500, 'El usuario ya tiene credenciales de administrador');
    }
    return addedManager;
};

const changeToCollaborator = async (projectId, userId, collaboratorId) => {
    if(!userId || !collaboratorId){
        throw showError(400, 'No envió el id del usuario');
    }
    if(!projectId){
        throw showError(400, 'No envió el id del projecto');
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const creator = project.imCreator(userId);
    if(!creator){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    const addedCollaborator = await ProjectRepository.changeToCollaborator(projectId, userId, collaboratorId);
    if(!addedCollaborator){
        throw showError(500, 'El usuario ya no tiene credenciales de administrador');
    }
    return addedCollaborator;
};

const removeCollaborator = async (projectId, userId, collaboratorId) => {
    if(!userId || !collaboratorId){
        throw showError(400, 'No envió el id del usuario')
    }
    if(!projectId){
        throw showError(400, 'No envió el id del projecto')
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const creator = project.imCreator(userId);
    if(!creator){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    const removedCollaborator = await ProjectRepository.removeCollaborator(projectId, userId, collaboratorId);
    if(!removedCollaborator){
        throw showError(500, 'El usuario ya no colabora en el proyecto');
    }
    return removedCollaborator;
};

const remove = async (projectId, userId) => {
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    if(!projectId){
        throw showError(400, 'No envió el id del projecto')
    }
    const removedProject = await ProjectRepository.remove(projectId, userId);
    if(!removedProject){
        throw showError(500, 'El proyecto no existe');
    }
    return removedProject;
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