"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = require("../repositories");

var _helpers = require("../../../helpers");

const signup = async user => {
  const userDB = await _repositories.UserRepository.getByEmail(user.email);

  if (userDB) {
    throw (0, _helpers.showError)(401, 'Ya existe un usuario con este correo electronico');
  }

  const createdUser = await _repositories.UserRepository.create(user);
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

const signin = async ({
  email,
  password
}) => {
  const userDB = await _repositories.UserRepository.getByEmail(email);

  if (!userDB) {
    throw (0, _helpers.showError)(401, 'El correo electronico o la contraseña son incorrectos');
  }

  const validPassword = userDB.comparePassword(password);

  if (!validPassword) {
    throw (0, _helpers.showError)(401, 'El correo electronico o la contraseña son incorrectos');
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

const update = async (userId, data) => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envio el id del usuario');
  }

  const updatedUser = await _repositories.UserRepository.update(userId, data);

  if (!updatedUser) {
    throw (0, _helpers.showError)(500, 'Ocurrió un erro o no tienes las credenciales para realizar esta acción');
  }

  return updatedUser;
};

var _default = {
  signup,
  signin,
  update
};
exports.default = _default;