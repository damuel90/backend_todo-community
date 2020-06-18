import { ProjectRepository, TaskRepository } from '../repositories';
import { showError } from '../../../helpers';

const create = async (task) => {
    if(!task.project){
        throw showError(400, 'No envió el id del projecto')
    }
    const project = await ProjectRepository.getById(task.project);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const manager = project.imManager(task.creator);
    if(!manager){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    return await TaskRepository.create(task);
};

const getProjectTasks = async (projectId, userId) => {
    if(!projectId){
        throw showError(400, 'No envió el id del proyecto')
    }
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    if(project.type === 'public'){
        return await TaskRepository.getByProject(projectId);
    }
    const collaborator = project.imCollaborator(userId);
    if(!collaborator){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    return await TaskRepository.getByProject(projectId);
};

const update = async (projectId, userId, taskId, data) => {
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    if(!projectId){
        throw showError(400, 'No envió el id del projecto')
    }
    if(!taskId){
        throw showError(400, 'No envió el id de la tarea')
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const manager = project.imManager(userId);
    if(!manager){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    return await TaskRepository.update(taskId, data);
};

const completedTask = async (taskId, userId, completed) => {
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    if(!taskId){
        throw showError(400, 'No envió el id de la tarea')
    }
    const task = await TaskRepository.getById(taskId);
    if(!task){
        throw showError(500, 'La tarea no existe');
    }
    const assigned = task.imAssigned(userId);
    if(!assigned){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    return await TaskRepository.update(taskId, { completed });
}

const remove = async (projectId, userId, taskId) => {
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const manager = project.imManager(userId);
    if(!manager){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    const deletedTask = await TaskRepository.remove(taskId);
    if(!deletedTask){
        throw showError(500, 'La tarea no existe');
    }
    return deletedTask;
};

export default {
    create,
    getProjectTasks,
    update,
    completedTask,
    remove
}