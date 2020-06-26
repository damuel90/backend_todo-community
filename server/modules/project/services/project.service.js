"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isCreator = exports.isManager = void 0;

var _repositories = require("../repositories");

var _helpers = require("../../../helpers");

const isManager = async (projectId, userId) => {
  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    return [false, 'El projecto no existe'];
  }

  const manager = project.imManager(userId);

  if (!manager) {
    return [false, 'No tiene las credenciales para realizar esta acción'];
  }

  return [true];
};

exports.isManager = isManager;

const isCreator = async (projectId, userId) => {
  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    return [false, 'El projecto no existe'];
  }

  const creator = project.imCreator(userId);

  if (!creator) {
    return [false, 'No tiene las credenciales para realizar esta acción'];
  }

  return [true];
};

exports.isCreator = isCreator;

const create = async project => {
  return await _repositories.ProjectRepository.create(project);
};

const getPublicProjects = async () => {
  return await _repositories.ProjectRepository.getAllPublic();
};

const getUserProjects = async userId => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el userId');
  }

  return await _repositories.ProjectRepository.getByUser(userId);
};

const update = async (projectId, userId, data) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    userId,
    data
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [manage, managerError] = await isManager(projectId, userId);

  if (!manage) {
    throw (0, _helpers.showError)(500, managerError);
  }

  return await _repositories.ProjectRepository.update(projectId, data);
};

const changeToManager = async (projectId, userId, collaboratorId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    userId,
    collaboratorId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [creator, creatorError] = await isCreator(projectId, userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, creatorError);
  }

  const addedManager = await _repositories.ProjectRepository.changeToManager(projectId, collaboratorId);

  if (!addedManager) {
    throw (0, _helpers.showError)(500, 'El usuario ya tiene credenciales de administrador');
  }

  return addedManager;
};

const changeToCollaborator = async (projectId, userId, collaboratorId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    userId,
    collaboratorId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [creator, creatorError] = await isCreator(projectId, userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, creatorError);
  }

  const addedCollaborator = await _repositories.ProjectRepository.changeToCollaborator(projectId, collaboratorId);

  if (!addedCollaborator) {
    throw (0, _helpers.showError)(500, 'El usuario ya no tiene credenciales de administrador');
  }

  return addedCollaborator;
};

const removeCollaborator = async (projectId, userId, collaboratorId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    userId,
    collaboratorId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [creator, creatorError] = await isCreator(projectId, userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, creatorError);
  }

  const removedCollaborator = await _repositories.ProjectRepository.removeCollaborator(projectId, collaboratorId);

  if (!removedCollaborator) {
    throw (0, _helpers.showError)(500, 'El usuario ya no colabora en el proyecto');
  }

  return removedCollaborator;
};

const remove = async (projectId, userId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    userId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const removedProject = await _repositories.ProjectRepository.remove(projectId, userId);

  if (!removedProject) {
    throw (0, _helpers.showError)(500, 'El proyecto no existe o no tiene las credenciales para realizar la acción');
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