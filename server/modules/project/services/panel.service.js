"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = require("../repositories");

var _project = require("./project.service");

var _helpers = require("../../../helpers");

const create = async (userId, panel) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    userId,
    proyecto: panel.project
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await (0, _project.isManager)(panel.project, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  const panels = await _repositories.PanelRepository.getByProject(panel.project);
  return await _repositories.PanelRepository.create({ ...panel,
    position: panels.length
  });
};

const getProjectPanels = async (projectId, userId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    userId,
    projectId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  if (project.type === 'public') {
    return await _repositories.PanelRepository.getByProject(projectId);
  }

  const collaborator = project.imCollaborator(userId);

  if (!collaborator) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.PanelRepository.getByProject(projectId);
};

const update = async (projectId, userId, panelId, data) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    userId,
    projectId,
    panelId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await (0, _project.isManager)(projectId, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  return await _repositories.PanelRepository.update(panelId, data);
};

const changePosition = async (projectId, userId, panelId, startPos, endPos) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    userId,
    projectId,
    panelId,
    startPos,
    endPos
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await (0, _project.isManager)(projectId, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  if (startPos > endPos) {
    await _repositories.PanelRepository.increasePosition(startPos, endPos);
  } else {
    await _repositories.PanelRepository.decreasePosition(startPos, endPos);
  }

  return await _repositories.PanelRepository.update(panelId, {
    position: endPos
  });
};

const addTask = async (projectId, userId, panelId, task) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    userId,
    projectId,
    panelId,
    task
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await (0, _project.isManager)(projectId, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  return await _repositories.PanelRepository.addTask(panelId, task);
};

const updateTask = async (projectId, userId, panelId, taskId, data) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    userId,
    projectId,
    panelId,
    taskId,
    data
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await (0, _project.isManager)(projectId, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  return await _repositories.PanelRepository.updateTask(panelId, taskId, data);
};

const removeTask = async (projectId, userId, panelId, taskId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    userId,
    projectId,
    panelId,
    taskId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await (0, _project.isManager)(projectId, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  const removedTask = await _repositories.PanelRepository.removeTask(panelId, taskId);

  if (!removedTask) {
    throw (0, _helpers.showError)(500, 'La tarea ya fue eliminada');
  }

  return removedTask;
};

const changePanel = async (projectId, userId, panel1Id, panel2Id, taskId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    userId,
    panel1Id,
    panel2Id,
    taskId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await (0, _project.isManager)(projectId, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  const [task] = await _repositories.PanelRepository.getTask(panel1Id, taskId);

  if (!task) {
    throw (0, _helpers.showError)(500, 'La tarea no existe');
  }

  await _repositories.PanelRepository.removeTask(panel1Id, taskId);
  const addedTask = await _repositories.PanelRepository.addTask(panel2Id, task);

  if (!addedTask) {
    throw (0, _helpers.showError)(500, 'El panel de destino no existe');
  }

  return addedTask;
};

const remove = async (projectId, userId, panelId, panelPosition) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    userId,
    panelId,
    panelPosition
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await (0, _project.isManager)(projectId, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  const panels = await _repositories.PanelRepository.getByProject(projectId);
  const deletedPanel = await _repositories.PanelRepository.remove(panelId);

  if (!deletedPanel) {
    throw (0, _helpers.showError)(500, 'El panel no existe');
  }

  return await _repositories.PanelRepository.decreasePosition(panelPosition, panels.length);
};

var _default = {
  create,
  getProjectPanels,
  update,
  changePosition,
  addTask,
  updateTask,
  removeTask,
  changePanel,
  remove
};
exports.default = _default;