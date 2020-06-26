"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const verifyParams = params => {
  for (const key in params) {
    if (!params[key]) {
      return [false, `No envió el ${key}`];
    }
  }

  return [true];
};

var _default = verifyParams;
exports.default = _default;