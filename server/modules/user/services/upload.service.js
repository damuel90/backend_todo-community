"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = require("../repositories");

const file = async file => {
  return await _repositories.UploadRepository.file(file);
};

const files = async files => {
  return await _repositories.UploadRepository.files(files);
};

var _default = {
  file,
  files
};
exports.default = _default;