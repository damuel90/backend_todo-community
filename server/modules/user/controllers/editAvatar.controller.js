"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = _interopRequireDefault(require("../services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const editAvatar = async (req, res) => {
  try {
    const {
      user,
      file
    } = req;
    const avatar = await _services.default.upload.file(file);
    const updatedUser = await _services.default.edit(user.userId, {
      avatar
    });
    if (!updatedUser) return res.status(500).send({
      status: 500,
      message: 'Ocurrió un error en el servidor'
    });
    return res.status(201).send({
      status: 201,
      avatar
    });
  } catch (error) {
    const {
      status = 500,
      message
    } = error;
    res.status(status).send({
      status,
      message
    });
  }
};

var _default = editAvatar;
exports.default = _default;