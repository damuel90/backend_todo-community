"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _user = require("../../user");

const create = async project => {
  const createdProject = await _models.Project.create(project);
  return await _user.User.populate(createdProject, [{
    path: 'managers',
    select: ['fullName', 'avatar']
  }, {
    path: 'collaborators',
    select: ['fullName', 'avatar']
  }]);
};

const getById = async projectId => {
  return await _models.Project.findById(projectId);
};

const getAllPublic = async () => {
  return await _models.Project.find({
    type: 'public'
  }).populate([{
    path: 'creator',
    model: 'user',
    select: ['fullName', 'avatar']
  }, {
    path: 'managers',
    model: 'user',
    select: ['fullName', 'avatar']
  }, {
    path: 'collaborators',
    model: 'user',
    select: ['fullName', 'avatar']
  }]);
};

const getByCreator = async userId => {
  return await _models.Project.find({
    creator: userId
  });
};

const getByUser = async userId => {
  return await _models.Project.find({
    $or: [{
      managers: userId
    }, {
      collaborators: userId
    }]
  }).populate([{
    path: 'managers',
    model: 'user',
    select: ['fullName', 'avatar']
  }, {
    path: 'collaborators',
    model: 'user',
    select: ['fullName', 'avatar']
  }]);
};

const update = async (projectId, data) => {
  return await _models.Project.findByIdAndUpdate(projectId, data, {
    new: true
  });
};

const addCollaborator = async (projectId, userId) => {
  const updatedProject = await _models.Project.updateOne({
    _id: projectId
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

const changeToManager = async (projectId, creatorId, collaboratorId) => {
  const updatedProject = await _models.Project.updateOne({
    _id: projectId,
    creator: creatorId,
    collaborators: collaboratorId
  }, {
    $push: {
      managers: collaboratorId
    },
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

const changeToCollaborator = async (projectId, creatorId, collaboratorId) => {
  const updatedProject = await _models.Project.updateOne({
    _id: projectId,
    creator: creatorId,
    managers: collaboratorId
  }, {
    $push: {
      collaborators: collaboratorId
    },
    $pull: {
      managers: collaboratorId
    }
  });

  if (updatedProject.n > 0 && updatedProject.ok > 0) {
    return true;
  }

  ;
  return false;
};

const removeCollaborator = async (projectId, creatorId, collaboratorId) => {
  const updatedProject = await _models.Project.updateOne({
    _id: projectId,
    creator: creatorId,
    $or: [{
      managers: collaboratorId
    }, {
      collaborators: collaboratorId
    }]
  }, {
    $pull: {
      managers: collaboratorId,
      collaborators: collaboratorId
    }
  });

  if (updatedProject.n > 0 && updatedProject.ok > 0) {
    return true;
  }

  ;
  return false;
};

const remove = async (projectId, userId) => {
  return await _models.Project.findOneAndRemove({
    _id: projectId,
    creator: userId
  });
};

var _default = {
  create,
  getById,
  getAllPublic,
  getByCreator,
  getByUser,
  update,
  addCollaborator,
  removeCollaborator,
  changeToManager,
  changeToCollaborator,
  remove
};
exports.default = _default;