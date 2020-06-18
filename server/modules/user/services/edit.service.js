"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = _interopRequireDefault(require("../repositories"));

var _helpers = require("../../../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const edit = (userId, data) => {
  if (!userId) {
    throw (0, _helpers.error)(400, 'No envio el id del usuario');
  }

  return _repositories.default.update(userId, data);
};

var _default = edit;
exports.default = _default;