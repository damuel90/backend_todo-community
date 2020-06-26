"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

const create = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    let invitation = { ...req.body,
      emitter: userId
    };
    await _services.InvitationService.create(invitation);
    return res.status(200).send({
      message: 'La invitación a colaborar ha sido enviada'
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

const getProjectInvitations = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      projectId
    } = req.params;
    const invitations = await _services.InvitationService.getProjectInvitations(projectId, userId);
    return res.status(201).send(invitations);
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

const getMyInvitations = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const myInvitations = await _services.InvitationService.getUserInvitations(userId);
    return res.status(201).send(myInvitations);
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

const acceptInvitation = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      projectId,
      invitationId
    } = req.body;
    await _services.InvitationService.acceptInvitation(projectId, invitationId, userId);
    return res.status(200).send({
      message: 'Se ha unido a colaborar'
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

const denyInvitation = async (req, res) => {
  try {
    const {
      userId
    } = req.user;
    const {
      invitationId
    } = req.body;
    await _services.InvitationService.denyInvitation(invitationId, userId);
    return res.status(200).send({
      message: 'ha rechazador unirse a colaborar'
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
      projectId,
      invitationId
    } = req.body;
    await _services.InvitationService.remove(projectId, invitationId, userId);
    return res.status(200).send({
      message: 'Se ha eliminado la invitación con exito'
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
  getProjectInvitations,
  getMyInvitations,
  acceptInvitation,
  denyInvitation,
  remove
};
exports.default = _default;