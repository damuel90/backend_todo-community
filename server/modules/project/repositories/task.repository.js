"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _user = require("../../user");

const create = async task => {
  const createdTask = await _models.Task.create(task);
  return await _user.User.populate(createdTask, [{
    path: 'creator',
    select: ['fullName', 'avatar']
  }, {
    path: 'assigned',
    select: ['fullName', 'avatar']
  }]);
};

const getById = async taskId => {
  return await _models.Task.findById(taskId);
};

const getByProject = async projectId => {
  return await _models.Task.find({
    project: projectId
  }).populate([{
    path: 'creator',
    model: 'user',
    select: ['fullName', 'avatar']
  }, {
    path: 'assigned',
    model: 'user',
    select: ['fullName', 'avatar']
  }]);
};

const update = async (taskId, data) => {
  return await _models.Task.findByIdAndUpdate(taskId, data, {
    new: true
  });
};

const remove = async taskId => {
  return await _models.Task.findByIdAndDelete(taskId);
};

var _default = {
  create,
  getById,
  getByProject,
  update,
  remove
};
exports.default = _default;