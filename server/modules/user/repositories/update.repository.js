"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const update = async (userId, data) => {
  return await _user.default.findByIdAndUpdate(userId, data, {
    new: true
  });
};

var _default = update;
exports.default = _default;