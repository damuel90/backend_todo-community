"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = _interopRequireDefault(require("../repositories"));

var _helpers = require("../../../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signin = async ({
  email,
  password
}) => {
  const userDB = await _repositories.default.getByEmail(email);

  if (!userDB) {
    throw (0, _helpers.error)(401, 'El correo electronico o la contraseña son incorrectos');
  }

  const validPassword = userDB.comparePassword(password);

  if (!validPassword) {
    throw (0, _helpers.error)(401, 'El correo electronico o la contraseña son incorrectos');
  }

  const userToEncode = {
    userId: userDB._id,
    email: userDB.email,
    fullName: userDB.fullName,
    avatar: userDB.avatar
  };
  const token = (0, _helpers.generateToken)(userToEncode);
  return { ...userToEncode,
    token
  };
};

var _default = signin;
exports.default = _default;