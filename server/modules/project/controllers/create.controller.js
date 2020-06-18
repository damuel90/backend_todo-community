"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invite = exports.createTask = exports.create = void 0;

var _services = _interopRequireDefault(require("../services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const create = async (req, res) => {
  try {
    let {
      body,
      user: {
        userId
      }
    } = req;
    body = { ...body,
      creator: userId,
      managers: [userId]
    };
    const createdProject = await _services.default.create.project(body);
    res.status(201).send({
      status: 201,
      data: createdProject
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

exports.create = create;

const createTask = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    let {
      projectId,
      ...body
    } = req.body;
    body = { ...body,
      creator: userId
    };
    const createdTask = await _services.default.create.task(projectId, body);
    res.status(201).send({
      status: 201,
      data: createdTask
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

exports.createTask = createTask;

const invite = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    let body = { ...req.body,
      emitter: userId
    };
    await _services.default.create.invitation(body);
    res.status(200).send({
      status: 200,
      message: 'La invitación a colaborar ha sido enviada'
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

exports.invite = invite;