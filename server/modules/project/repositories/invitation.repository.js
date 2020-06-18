"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

const create = async invitation => {
  return await _models.Invitation.create(invitation);
};

const getById = async invitationId => {
  return await _models.Invitation.findById(invitationId);
};

const getByProject = async projectId => {
  return await _models.Invitation.find({
    project: projectId
  }).populate([{
    path: 'emitter',
    model: 'user',
    select: ['fullName', 'avatar']
  }, {
    path: 'receiver',
    model: 'user',
    select: ['fullName', 'avatar']
  }]);
};

const getByUser = async userId => {
  return await _models.Invitation.find({
    receiver: userId,
    state: 'waiting'
  }).populate([{
    path: 'emitter',
    model: 'user',
    select: ['fullName', 'avatar']
  }, {
    path: 'receiver',
    model: 'user',
    select: ['fullName', 'avatar']
  }]);
};

const update = async (invitationId, data) => {
  return await _models.Invitation.findByIdAndUpdate(invitationId, data, {
    new: true
  });
};

const remove = async invitationId => {
  return await _models.Invitation.findByIdAndDelete(invitationId);
};

var _default = {
  create,
  getById,
  getByProject,
  getByUser,
  update,
  remove
};
exports.default = _default;