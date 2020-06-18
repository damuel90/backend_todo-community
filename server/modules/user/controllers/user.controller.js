"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

const signup = async (req, res) => {
  try {
    let {
      body,
      file
    } = req;

    if (file) {
      const avatar = await _services.UploadService.file(file);
      body = { ...body,
        avatar
      };
    }

    const user = await _services.UserService.signup(body);
    return res.status(201).send({
      status: 201,
      data: user
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      status,
      message
    });
  }
};

const signin = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await _services.UserService.signin({
      email,
      password
    });
    return res.status(201).send({
      status: 201,
      data: user
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      status,
      message
    });
  }
};

const editAvatar = async (req, res) => {
  try {
    const {
      user,
      file
    } = req;
    const avatar = await _services.UploadService.file(file);
    await _services.UserService.update(user.userId, {
      avatar
    });
    return res.status(201).send({
      status: 201,
      avatar
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      status,
      message
    });
  }
};

const editFullname = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      fullName
    } = req.query;
    await _services.UserService.update(userId, {
      fullName
    });
    return res.status(200).send({
      status: 200,
      message: 'El nombre del usuario ha sido modificado con exito'
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      status,
      message
    });
  }
};

var _default = {
  signup,
  signin,
  editAvatar,
  editFullname
};
exports.default = _default;