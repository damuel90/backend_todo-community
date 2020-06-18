"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _config = require("../config");

const generateToken = user => {
  return (0, _jsonwebtoken.sign)({
    user
  }, _config.JWT_SECRET, {
    expiresIn: _config.JWT_EXPIRE
  });
};

var _default = generateToken;
exports.default = _default;