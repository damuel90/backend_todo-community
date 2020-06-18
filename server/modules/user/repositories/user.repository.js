"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

const create = async user => {
  return await _models.User.create(user);
};

const get = async userId => {
  return await _models.User.findById(userId);
};

const getByEmail = async email => {
  return await _models.User.findOne({
    email
  });
};

const getAll = async () => {
  return await _models.User.find();
};

const update = async (userId, data) => {
  return await _models.User.findByIdAndUpdate(userId, data, {
    new: true
  });
};

var _default = {
  create,
  get,
  getByEmail,
  getAll,
  update
};
exports.default = _default;