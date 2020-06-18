"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = _interopRequireDefault(require("../services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signin = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await _services.default.signin({
      email,
      password
    });
    res.status(201).send({
      status: 201,
      data: user
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

var _default = signin;
exports.default = _default;