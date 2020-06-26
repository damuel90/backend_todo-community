import { PanelRepository, ProjectRepository } from '../repositories';
import { isManager } from './project.service';
import { showError, verifyParams } from '../../../helpers';

const create = async (userId, panel) => {
    const [exists, paramError] = verifyParams({ userId, proyecto: panel.project });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(panel.project, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    const panels = await PanelRepository.getByProject(panel.project);
    return await PanelRepository.create({...panel, position: panels.length});
};

const getProjectPanels = async (projectId, userId) => {
    const [ exists, paramError ] = verifyParams({ userId, projectId });
    if(!exists){
        throw showError(400, paramError);
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    if(project.type === 'public'){
        return await PanelRepository.getByProject(projectId);
    }
    const collaborator = project.imCollaborator(userId);
    if(!collaborator){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    return await PanelRepository.getByProject(projectId);
};

const update = async (projectId, userId, panelId, data) => {
    const [exists, paramError] = verifyParams({ userId, projectId, panelId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(projectId, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    return await PanelRepository.update(panelId, data);
};

const changePosition = async (projectId, userId, panelId, startPos, endPos) => {
    const [exists, paramError] = verifyParams({ userId, projectId, panelId, startPos, endPos });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(projectId, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    if(startPos > endPos){
        await PanelRepository.increasePosition(startPos, endPos);
    } else {
        await PanelRepository.decreasePosition(startPos, endPos);
    }
    return await PanelRepository.update(panelId, { position: endPos });
};

const addTask = async (projectId, userId, panelId, task) => {
    const [exists, paramError] = verifyParams({ userId, projectId, panelId, task });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(projectId, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    return await PanelRepository.addTask(panelId, task);
};

const updateTask = async (projectId, userId, panelId, taskId, data) => {
    const [exists, paramError] = verifyParams({ userId, projectId, panelId, taskId, data });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(projectId, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    return await PanelRepository.updateTask(panelId, taskId, data);
};

const removeTask = async (projectId, userId, panelId, taskId) => {
    const [exists, paramError] = verifyParams({ userId, projectId, panelId, taskId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(projectId, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    const removedTask = await PanelRepository.removeTask(panelId, taskId);
    if(!removedTask){
        throw showError(500, 'La tarea ya fue eliminada')
    }
    return removedTask;
};

const changePanel = async (projectId, userId, panel1Id, panel2Id, taskId) => {
    const [exists, paramError] = verifyParams({ projectId, userId, panel1Id, panel2Id, taskId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(projectId, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    const [task] = await PanelRepository.getTask(panel1Id, taskId);
    if(!task){
        throw showError(500, 'La tarea no existe');
    }
    await PanelRepository.removeTask(panel1Id, taskId);
    const addedTask = await PanelRepository.addTask(panel2Id, task);
    if(!addedTask){
        throw showError(500, 'El panel de destino no existe');
    }
    return addedTask;
};

const remove = async (projectId, userId, panelId, panelPosition) => {
    const [exists, paramError] = verifyParams({ projectId, userId, panelId, panelPosition });
    if(!exists){
        throw showError(400, paramError);
    }
    const [manage, managerError] = await isManager(projectId, userId);
    if(!manage){
        throw showError(500, managerError)
    }
    const panels = await PanelRepository.getByProject(projectId);
    const deletedPanel = await PanelRepository.remove(panelId);
    if(!deletedPanel){
        throw showError(500, 'El panel no existe');
    }
    return await PanelRepository.decreasePosition(panelPosition, panels.length);
};

export default {
    create,
    getProjectPanels,
    update,
    changePosition,
    addTask,
    updateTask,
    removeTask,
    changePanel,
    remove
}