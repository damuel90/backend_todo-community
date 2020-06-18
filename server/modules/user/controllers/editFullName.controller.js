"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = _interopRequireDefault(require("../services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const editFullname = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      fullName
    } = req.query;
    const updatedUser = await _services.default.edit(userId, {
      fullName
    });
    if (!updatedUser) return res.status(500).send({
      status: 500,
      message: 'Ocurrió un error en el servidor'
    });
    return res.status(200).send({
      status: 200,
      message: 'El nombre del usuario ha sido modificado con exito'
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

var _default = editFullname;
exports.default = _default;