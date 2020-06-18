"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const notFound = (req, res, next) => res.status(404).send({
  status: 404,
  message: 'No se encontró el recurso'
});

var _default = notFound;
exports.default = _default;