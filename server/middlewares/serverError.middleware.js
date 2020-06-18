"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const serverError = (err, req, res, next) => {
  const httpStatus = err.status || 500;
  return res.status(httpStatus).send({
    status: httpStatus,
    message: err.message || 'Internal server error'
  });
};

var _default = serverError;
exports.default = _default;