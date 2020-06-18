"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = require("../repositories");

var _helpers = require("../../../helpers");

const create = async task => {
  if (!task.project) {
    throw (0, _helpers.showError)(400, 'No envió el id del projecto');
  }

  const project = await _repositories.ProjectRepository.getById(task.project);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const manager = project.imManager(task.creator);

  if (!manager) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.TaskRepository.create(task);
};

const getProjectTasks = async (projectId, userId) => {
  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del proyecto');
  }

  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  if (project.type === 'public') {
    return await _repositories.TaskRepository.getByProject(projectId);
  }

  const collaborator = project.imCollaborator(userId);

  if (!collaborator) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.TaskRepository.getByProject(projectId);
};

const update = async (projectId, userId, taskId, data) => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del projecto');
  }

  if (!taskId) {
    throw (0, _helpers.showError)(400, 'No envió el id de la tarea');
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const manager = project.imManager(userId);

  if (!manager) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.TaskRepository.update(taskId, data);
};

const completedTask = async (taskId, userId, completed) => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  if (!taskId) {
    throw (0, _helpers.showError)(400, 'No envió el id de la tarea');
  }

  const task = await _repositories.TaskRepository.getById(taskId);

  if (!task) {
    throw (0, _helpers.showError)(500, 'La tarea no existe');
  }

  const assigned = task.imAssigned(userId);

  if (!assigned) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.TaskRepository.update(taskId, {
    completed
  });
};

const remove = async (projectId, userId, taskId) => {
  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const manager = project.imManager(userId);

  if (!manager) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  const deletedTask = await _repositories.TaskRepository.remove(taskId);

  if (!deletedTask) {
    throw (0, _helpers.showError)(500, 'La tarea no existe');
  }

  return deletedTask;
};

var _default = {
  create,
  getProjectTasks,
  update,
  completedTask,
  remove
};
exports.default = _default;