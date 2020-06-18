"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const error = (status, message) => {
  let error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

var _default = error;
exports.default = _default;