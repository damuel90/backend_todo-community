"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ProjectController", {
  enumerable: true,
  get: function () {
    return _project.default;
  }
});
Object.defineProperty(exports, "TaskController", {
  enumerable: true,
  get: function () {
    return _task.default;
  }
});
Object.defineProperty(exports, "InvitationController", {
  enumerable: true,
  get: function () {
    return _invitation.default;
  }
});

var _project = _interopRequireDefault(require("./project.controller"));

var _task = _interopRequireDefault(require("./task.controller"));

var _invitation = _interopRequireDefault(require("./invitation.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }