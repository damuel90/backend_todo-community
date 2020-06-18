"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.addTask = exports.addManager = exports.removeCollaborator = exports.addCollaborator = exports.updateProject = void 0;

var _models = require("../models");

const updateProject = async (projectId, data) => {
  return await _models.Project.findByIdAndUpdate(projectId, data, {
    new: true
  });
};

exports.updateProject = updateProject;

const addCollaborator = async (projectId, managerId, userId) => {
  const updatedProject = await _models.Project.updateOne({
    _id: projectId,
    managers: managerId
  }, {
    $push: {
      collaborators: userId
    }
  });

  if (updatedProject.n > 0 && updatedProject.ok > 0) {
    return true;
  }

  ;
  return false;
};

exports.addCollaborator = addCollaborator;

const removeCollaborator = async (projectId, managerId, collaboratorId) => {
  const updatedProject = await _models.Project.updateOne({
    _id: projectId,
    managers: managerId
  }, {
    $pull: {
      collaborators: collaboratorId
    }
  });

  if (updatedProject.n > 0 && updatedProject.ok > 0) {
    return true;
  }

  ;
  return false;
};

exports.removeCollaborator = removeCollaborator;

const addManager = async (projectId, managerId, collaboratorId) => {
  const updatedProject = await _models.Project.updateOne({
    _id: projectId,
    managers: managerId
  }, {
    $push: {
      managers: collaboratorId
    }
  });

  if (updatedProject.n > 0 && updatedProject.ok > 0) {
    return await removeCollaborator(projectId, managerId, collaboratorId);
  }

  ;
  return false;
};

exports.addManager = addManager;

const addTask = async (projectId, managerId, taskId) => {
  const updatedProject = await _models.Project.updateOne({
    _id: projectId,
    managers: managerId
  }, {
    $push: {
      tasks: taskId
    }
  });

  if (updatedProject.n > 0 && updatedProject.ok > 0) {
    return true;
  }

  ;
  return false;
};

exports.addTask = addTask;

const updateTask = async (taskId, data) => {
  return await _models.Task.findByIdAndUpdate(taskId, data, {
    new: true
  });
};

exports.updateTask = updateTask;