"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInvitationByUser = exports.getInvitationByProject = exports.getInvitationById = exports.getTaskById = exports.getProjectsByCollaborator = exports.getProjectsByCreator = exports.getPublicProjects = exports.getProjectById = void 0;

var _models = require("../models");

const getProjectById = async projectId => {
  return await _models.Project.findById(projectId);
};

exports.getProjectById = getProjectById;

const getPublicProjects = async () => {
  return await _models.Project.find({
    type: 'public'
  });
};

exports.getPublicProjects = getPublicProjects;

const getProjectsByCreator = async userId => {
  return await _models.Project.find({
    creator: userId
  });
};

exports.getProjectsByCreator = getProjectsByCreator;

const getProjectsByCollaborator = async userId => {
  return await _models.Project.find({
    collaborators: userId
  });
};

exports.getProjectsByCollaborator = getProjectsByCollaborator;

const getTaskById = async taskId => {
  return await _models.Task.findById(taskId);
};

exports.getTaskById = getTaskById;

const getInvitationById = async invitationId => {
  return await _models.Invitation.findById(invitationId);
};

exports.getInvitationById = getInvitationById;

const getInvitationByProject = async projectId => {
  return await _models.Invitation.find({
    project: projectId,
    state: 'waiting'
  });
};

exports.getInvitationByProject = getInvitationByProject;

const getInvitationByUser = async userId => {
  return await _models.Invitation.find({
    receiver: userId,
    state: 'waiting'
  });
};

exports.getInvitationByUser = getInvitationByUser;