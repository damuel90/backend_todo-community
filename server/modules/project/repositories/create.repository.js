"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInvitation = exports.createTask = exports.createProject = void 0;

var _models = require("../models");

var _user = require("../../user");

const createProject = async project => {
  const createdProject = await _models.Project.create(project);
  return await _user.User.populate(createdProject, {
    path: 'managers',
    select: ['fullName', 'email', 'avatar']
  });
};

exports.createProject = createProject;

const createTask = async task => {
  const createdTask = await _models.Task.create(task);
  return await _user.User.populate(createdTask, [{
    path: 'creator',
    select: ['fullName', 'email', 'avatar']
  }, {
    path: 'assigned',
    select: ['fullName', 'email', 'avatar']
  }]);
};

exports.createTask = createTask;

const createInvitation = async invitation => {
  return await _models.Invitation.create(invitation);
};

exports.createInvitation = createInvitation;