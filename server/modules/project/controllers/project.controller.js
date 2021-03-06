"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

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
    const createdProject = await _services.ProjectService.create(body);
    return res.status(201).send(createdProject);
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      message
    });
  }
};

const getPublicProjects = async (req, res) => {
  try {
    const publicProjects = await _services.ProjectService.getPublicProjects();
    return res.status(201).send(publicProjects);
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      message
    });
  }
};

const getMyProjects = async (req, res) => {
  try {
    let {
      userId
    } = req.user;
    const myProjects = await _services.ProjectService.getUserProjects(userId);
    return res.status(201).send(myProjects);
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
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
      ...data
    } = req.body;
    await _services.ProjectService.update(projectId, userId, data);
    return res.status(200).send({
      message: 'El projecto se actualizó con exito'
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      message
    });
  }
};

const changeToManager = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      projectId,
      collaboratorId
    } = req.body;
    await _services.ProjectService.changeToManager(projectId, userId, collaboratorId);
    return res.status(200).send({
      message: 'Ha dado credenciales de administrador a un colaborador'
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      message
    });
  }
};

const changeToCollaborator = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      projectId,
      collaboratorId
    } = req.body;
    await _services.ProjectService.changeToCollaborator(projectId, userId, collaboratorId);
    return res.status(200).send({
      message: 'Ha quitado las credenciales de administrador a un colaborador'
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      message
    });
  }
};

const removeCollaborator = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      projectId,
      collaboratorId
    } = req.body;
    await _services.ProjectService.removeCollaborator(projectId, userId, collaboratorId);
    return res.status(200).send({
      message: 'Ha expulsado a un colaborador del proyecto'
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
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
      projectId
    } = req.params;
    await _services.ProjectService.remove(projectId, userId);
    return res.status(200).send({
      message: 'Se ha eliminado el proyecto con exito'
    });
  } catch (error) {
    const {
      status = 500,
      message = 'Ocurrió un error en el servidor'
    } = error;
    return res.status(status).send({
      message
    });
  }
};

var _default = {
  create,
  getPublicProjects,
  getMyProjects,
  update,
  removeCollaborator,
  changeToManager,
  changeToCollaborator,
  remove
};
exports.default = _default;