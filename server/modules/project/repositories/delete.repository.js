"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteInvitation = exports.deleteTask = exports.deleteProject = void 0;

var _models = require("../models");

const deleteProject = async (projectId, managerId) => {
  return await _models.Project.findOneAndRemove({
    _id: projectId,
    managers: managerId
  });
};

exports.deleteProject = deleteProject;

const deleteTask = async (projectId, taskId, managerId) => {
  const removedTask = await _models.Project.updateOne({
    _id: projectId,
    managers: managerId
  }, {
    $pull: {
      task: taskId
    }
  });

  if (removedTask.n > 0 && removedTask.ok > 0) {
    return await _models.Task.findOneAndRemove(taskId);
  }

  ;
  return false;
};

exports.deleteTask = deleteTask;

const deleteInvitation = async invitationId => {
  return await _models.Project.findByIdAndDelete(invitationId);
};

exports.deleteInvitation = deleteInvitation;