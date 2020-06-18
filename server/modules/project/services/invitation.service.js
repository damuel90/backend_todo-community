"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = require("../repositories");

var _helpers = require("../../../helpers");

const checkInvitation = (invitations, receiver) => {
  for (const invited of invitations) {
    if (invited.receiver._id == receiver) {
      if (invited.state == 'waiting') {
        return [true, 'Ya envió una invitación a este usuario'];
      } else if (invited.state == 'accepted') {
        return [true, 'Este usuario ya aceptó la invitación a colaborar'];
      }

      break;
    }
  }

  return [false];
};

const create = async invitation => {
  const invitations = await _repositories.InvitationRepository.getByProject(invitation.project);
  const [invited, message] = checkInvitation(invitations);

  if (invited) {
    throw (0, _helpers.showError)(400, message);
  }

  const project = await _repositories.ProjectRepository.getById(invitation.project);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const creator = project.imCreator(invitation.emitter);

  if (!creator) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.InvitationRepository.create(invitation);
};

const getProjectInvitations = async (projectId, userId) => {
  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del proyecto');
  }

  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const creator = project.imCreator(userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.InvitationRepository.getByProject(projectId);
};

const getUserInvitations = async userId => {
  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  return await _repositories.InvitationRepository.getByUser(userId);
};

const acceptInvitation = async (invitationId, collaboratorId, userId) => {
  if (!invitationId) {
    throw (0, _helpers.showError)(400, 'No envió el id de la invitación');
  }

  if (!userId || !collaboratorId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  const invitation = await _repositories.InvitationRepository.getById(invitationId);

  if (!invitation) {
    throw (0, _helpers.showError)(500, 'La invitacion no existe o fue eliminada');
  }

  const receiver = invitation.imReceiver(userId);

  if (!receiver) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  if (invitation.state !== 'waiting') {
    const state = invitation.state === 'accepted' ? 'aceptada' : 'rechazada';
    throw (0, _helpers.showError)(500, `La invitación ya fue ${state}`);
  }

  const addedCollaborator = await _repositories.ProjectRepository.addCollaborator(invitation.project, collaboratorId);

  if (!addedCollaborator) {
    throw (0, _helpers.showError)(500, 'Ocurrió un error en el servidor');
  }

  return await _repositories.InvitationRepository.update(invitationId, {
    state: 'accepted'
  });
};

const denyInvitation = async (invitationId, userId) => {
  if (!invitationId) {
    throw (0, _helpers.showError)(400, 'No envió el id de la invitación');
  }

  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  const invitation = await _repositories.InvitationRepository.getById(invitationId);

  if (!invitation) {
    throw (0, _helpers.showError)(500, 'La invitacion no existe o fue eliminada');
  }

  const receiver = invitation.imReceiver(userId);

  if (!receiver) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
  }

  if (invitation.state !== 'waiting') {
    const state = invitation.state === 'accepted' ? 'aceptada' : 'rechazada';
    throw (0, _helpers.showError)(500, `La invitación ya fue ${state}`);
  }

  return await _repositories.InvitationRepository.update(invitationId, {
    state: 'denied'
  });
};

const remove = async (projectId, userId, invitationId) => {
  if (!projectId) {
    throw (0, _helpers.showError)(400, 'No envió el id del proyecto');
  }

  if (!userId) {
    throw (0, _helpers.showError)(400, 'No envió el id del usuario');
  }

  if (!invitationId) {
    throw (0, _helpers.showError)(400, 'No envió el id de la invitación');
  }

  const project = await _repositories.ProjectRepository.getById(projectId);

  if (!project) {
    throw (0, _helpers.showError)(500, 'El projecto no existe');
  }

  const creator = project.imCreator(userId);

  if (!creator) {
    throw (0, _helpers.showError)(500, 'No tiene las credenciales para realizar esta acción');
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