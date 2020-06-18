"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UserRepository", {
  enumerable: true,
  get: function () {
    return _user.default;
  }
});
Object.defineProperty(exports, "UploadRepository", {
  enumerable: true,
  get: function () {
    return _upload.default;
  }
});

var _user = _interopRequireDefault(require("./user.repository"));

var _upload = _interopRequireDefault(require("./upload.repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }