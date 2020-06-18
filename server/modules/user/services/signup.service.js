"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = _interopRequireDefault(require("../repositories"));

var _helpers = require("../../../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signup = async user => {
  const userDB = await _repositories.default.getByEmail(user.email);

  if (userDB) {
    throw (0, _helpers.error)(401, 'Ya existe un usuario con este correo electronico');
  }

  const createdUser = await _repositories.default.create(user);
  const userToEncode = {
    userId: createdUser._id,
    email: createdUser.email,
    fullName: createdUser.fullName,
    avatar: createdUser.avatar
  };
  const token = (0, _helpers.generateToken)(userToEncode);
  return { ...userToEncode,
    token
  };
};

var _default = signup;
exports.default = _default;