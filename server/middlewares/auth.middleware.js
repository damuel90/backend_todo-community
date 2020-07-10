"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _config = require("../config");

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).send({
      status: 401,
      message: 'No tienes autorización'
    });
  }

  const token = req.headers.authorization.split(' ')[1]; //realizamos el Bearer para obtener el token

  (0, _jsonwebtoken.verify)(token, _config.JWT_SECRET, function (err, decodedToken) {
    if (err) {
      res.status(403).send({
        status: 403,
        message: 'El token es inválido'
      });
    }

    req.user = decodedToken.user;
    next();
  });
};

var _default = auth;
exports.default = _default;