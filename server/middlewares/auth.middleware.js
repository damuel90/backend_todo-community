"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _config = require("../config");

const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).send({
      status: 401,
      message: 'El token no fue enviado'
    });
  }

  (0, _jsonwebtoken.verify)(token, _config.JWT_SECRET, function (err, decodedToken) {
    if (err) {
      res.status(401).send({
        status: 401,
        message: 'El token es inválido'
      });
    }

    req.user = decodedToken.user;
    next();
  });
};

var _default = auth;
exports.default = _default;