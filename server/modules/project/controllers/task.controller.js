"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

const create = async (req, res) => {
  try {
    const {
      body,
      user: {
        userId
      }
    } = req;
    const task = { ...body,
      creator: userId
    };
    const createdTask = await _services.TaskService.create(task);
    return res.status(201).send({
      status: 201,
      data: createdTask
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

const getProjectTasks = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      projectId
    } = req.params;
    const tasks = await _services.TaskService.getProjectTasks(projectId, userId);
    return res.status(201).send({
      status: 201,
      data: tasks
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

const update = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      projectId,
      taskId,
      ...data
    } = req.body;
    await _services.TaskService.update(projectId, userId, taskId, data);
    return res.status(200).send({
      status: 200,
      message: 'La tarea se actualizó con exito'
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

const completedTask = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      taskId,
      completed
    } = req.body;
    await _services.TaskService.completedTask(taskId, userId, completed);
    return res.status(200).send({
      status: 200,
      message: 'La tarea se actualizó con exito'
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

const remove = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      projectId,
      taskId
    } = req.body;
    await _services.TaskService.remove(projectId, userId, taskId);
    return res.status(200).send({
      status: 200,
      message: 'Se ha eliminado la tarea con exito'
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
  create,
  getProjectTasks,
  update,
  completedTask,
  remove
};
exports.default = _default;