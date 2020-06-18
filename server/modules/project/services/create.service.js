"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _repositories = _interopRequireDefault(require("../repositories"));

var _helpers = require("../../../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const project = async project => {
  return await _repositories.default.createProject(project);
};

const task = async (projectId, task) => {
  const createdTask = await _repositories.default.createTask(task);

  if (!createdTask) {
    throw (0, _helpers.error)(500, 'Ocurrió un error en el servidor');
  }

  await _repositories.default.addTask(projectId, createdTask.creator, createdTask._id);
  return createdTask;
};

const invitation = async invitation => {
  const invitations = await _repositories.default.getInvitationByProject(invitation.project);

  for (const invited of invitations) {
    if (invited.receiver == invitation.receiver) {
      throw (0, _helpers.error)(200, 'Ya envió una invitación a este usuario');
    }
  }

  const project = await _repositories.default.getProjectById(invitation.project);

  if (!project) {
    throw (0, _helpers.error)(500, 'El projecto no existe');
  }

  const manager = project.imManager(invitation.emitter);

  if (!manager) {
    throw (0, _helpers.error)(500, 'No tiene las credenciales para realizar esta acción');
  }

  return await _repositories.default.createInvitation(invitation);
};

var _default = {
  project,
  task,
  invitation
};
exports.default = _default;