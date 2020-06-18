"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = _interopRequireDefault(require("../services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signup = async (req, res) => {
  try {
    let {
      body,
      file
    } = req;

    if (file) {
      const avatar = await _services.default.upload.file(file);
      body = { ...body,
        avatar
      };
    }

    const user = await _services.default.signup(body);
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

var _default = signup;
exports.default = _default;