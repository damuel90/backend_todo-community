"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getByEmail = exports.getAll = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAll = async () => {
  return await _user.default.find();
};

exports.getAll = getAll;

const getByEmail = async email => {
  return await _user.default.findOne({
    email
  });
};

exports.getByEmail = getByEmail;

const get = async userId => {
  return await _user.default.findById(userId);
};

var _default = get;
exports.default = _default;