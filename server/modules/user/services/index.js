"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UserService", {
  enumerable: true,
  get: function () {
    return _user.default;
  }
});
Object.defineProperty(exports, "UploadService", {
  enumerable: true,
  get: function () {
    return _upload.default;
  }
});

var _user = _interopRequireDefault(require("./user.service"));

var _upload = _interopRequireDefault(require("./upload.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }