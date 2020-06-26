"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = require("../repositories");

var _project = require("./project.service");

var _helpers = require("../../../helpers");

const checkInvitation = (invitations, receiver) => {
  for (const invited of invitations) {
    if (invited.receiver._id == receiver) {
      if (invited.state == 'waiting') {
        return [true, 'Ya envió una invitación a este usuario'];
      } else if (invited.state == 'accepted') {
        return [true, 'Este usuario ya aceptó la invitación a colaborar'];
      } else {
        return [true, 'Este usuario rechazó la invitación a colaborar'];
      }

      break;
    }
  }

  return [false];
};

const validInvitation = async (invitationId, userId) => {
  const invitation = await _repositories.InvitationRepository.getById(invitationId);

  if (!invitation) {
    return [false, 'La invitacion no existe o fue eliminada'];
  }

  const receiver = invitation.imReceiver(userId);

  if (!receiver) {
    [false, 'No tiene las credenciales para realizar esta acción'];
  }

  if (invitation.state !== 'waiting') {
    const state = invitation.state === 'accepted' ? 'aceptada' : 'rechazada';
    return [false, `La invitación ya fue ${state}`];
  }

  return [true];
};

const create = async invitation => {
  const invitations = await _repositories.InvitationRepository.getByProject(invitation.project);
  const [invited, message] = checkInvitation(invitations, invitation.receiver);

  if (invited) {
    throw (0, _helpers.showError)(400, message);
  }

  const [creator, creatorError] = await (0, _project.isCreator)(invitation.project, invitation.emitter);

  if (!creator) {
    throw (0, _helpers.showError)(500, creatorError);
  }

  return await _repositories.InvitationRepository.create(invitation);
};

const getProjectInvitations = async (projectId, userId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    userId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [creator, creatorError] = await (0, _project.isCreator)(projectId, userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, creatorError);
  }

  return await _repositories.InvitationRepository.getByProject(projectId);
};

const getUserInvitations = async userId => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el userId');
  }

  return await _repositories.InvitationRepository.getByUser(userId);
};

const acceptInvitation = async (projectId, invitationId, userId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    invitationId,
    userId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [valid, invitationError] = await validInvitation(invitationId, userId);

  if (!valid) {
    throw (0, _helpers.showError)(500, invitationError);
  }

  const addedCollaborator = await _repositories.ProjectRepository.addCollaborator(projectId, userId);

  if (!addedCollaborator) {
    throw (0, _helpers.showError)(500, 'Ocurrió un error en el servidor');
  }

  return await _repositories.InvitationRepository.update(invitationId, {
    state: 'accepted'
  });
};

const denyInvitation = async (invitationId, userId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    invitationId,
    userId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [valid, invitationError] = await validInvitation(invitationId, userId);

  if (!valid) {
    throw (0, _helpers.showError)(500, invitationError);
  }

  return await _repositories.InvitationRepository.update(invitationId, {
    state: 'denied'
  });
};

const remove = async (projectId, invitationId, userId) => {
  const [exists, paramError] = (0, _helpers.verifyParams)({
    projectId,
    invitationId,
    userId
  });

  if (!exists) {
    throw (0, _helpers.showError)(400, paramError);
  }

  const [creator, creatorError] = await (0, _project.isCreator)(projectId, userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, creatorError);
  }

  const deletedInvitation = await _repositories.InvitationRepository.remove(invitationId);

  if (!deletedInvitation) {
    throw (0, _helpers.showError)(500, 'La invitación no existe');
  }

  return deletedInvitation;
};

var _default = {
  create,
  getProjectInvitations,
  getUserInvitations,
  acceptInvitation,
  denyInvitation,
  remove
};
exports.default = _default;