"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = require("../repositories");

var _helpers = require("../../../helpers");

const create = async project => {
  return await _repositories.ProjectRepository.create(project);
};

const getPublicProjects = async () => {
  return await _repositories.ProjectRepository.getAllPublic();
};

const getUserProjects = async userId => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  return await _repositories.ProjectRepository.getByUser(userId);
};

const update = async (projectId, userId, data) => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del projecto');
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const manager = project.imManager(userId);

  if (!manager) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.ProjectRepository.update(projectId, data);
};

const changeToManager = async (projectId, userId, collaboratorId) => {
  if (!userId || !collaboratorId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del projecto');
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const creator = project.imCreator(userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  const addedManager = await _repositories.ProjectRepository.changeToManager(projectId, userId, collaboratorId);

  if (!addedManager) {
    throw (0, _helpers.showError)(500, 'El usuario ya tiene credenciales de administrador');
  }

  return addedManager;
};

const changeToCollaborator = async (projectId, userId, collaboratorId) => {
  if (!userId || !collaboratorId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del projecto');
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const creator = project.imCreator(userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  const addedCollaborator = await _repositories.ProjectRepository.changeToCollaborator(projectId, userId, collaboratorId);

  if (!addedCollaborator) {
    throw (0, _helpers.showError)(500, 'El usuario ya no tiene credenciales de administrador');
  }

  return addedCollaborator;
};

const removeCollaborator = async (projectId, userId, collaboratorId) => {
  if (!userId || !collaboratorId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del projecto');
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const creator = project.imCreator(userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  const removedCollaborator = await _repositories.ProjectRepository.removeCollaborator(projectId, userId, collaboratorId);

  if (!removedCollaborator) {
    throw (0, _helpers.showError)(500, 'El usuario ya no colabora en el proyecto');
  }

  return removedCollaborator;
};

const remove = async (projectId, userId) => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del projecto');
  }

  const removedProject = await _repositories.ProjectRepository.remove(projectId, userId);

  if (!removedProject) {
    throw (0, _helpers.showError)(500, 'El proyecto no existe');
  }

  return removedProject;
};

var _default = {
  create,
  getPublicProjects,
  getUserProjects,
  update,
  removeCollaborator,
  changeToManager,
  changeToCollaborator,
  remove
};
exports.default = _default;