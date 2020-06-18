"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const showError = (status, message) => {
  let error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

var _default = showError;
exports.default = _default;