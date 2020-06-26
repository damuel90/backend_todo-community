"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Project", {
  enumerable: true,
  get: function () {
    return _models.Project;
  }
});
Object.defineProperty(exports, "Panel", {
  enumerable: true,
  get: function () {
    return _models.Panel;
  }
});
Object.defineProperty(exports, "Invitation", {
  enumerable: true,
  get: function () {
    return _models.Invitation;
  }
});
Object.defineProperty(exports, "ProjectRepository", {
  enumerable: true,
  get: function () {
    return _repositories.ProjectRepository;
  }
});
Object.defineProperty(exports, "PanelRepository", {
  enumerable: true,
  get: function () {
    return _repositories.PanelRepository;
  }
});
Object.defineProperty(exports, "InvitationRepository", {
  enumerable: true,
  get: function () {
    return _repositories.InvitationRepository;
  }
});
Object.defineProperty(exports, "ProjectService", {
  enumerable: true,
  get: function () {
    return _services.ProjectService;
  }
});
Object.defineProperty(exports, "PanelService", {
  enumerable: true,
  get: function () {
    return _services.PanelService;
  }
});
Object.defineProperty(exports, "InvitationService", {
  enumerable: true,
  get: function () {
    return _services.InvitationService;
  }
});
Object.defineProperty(exports, "ProjectController", {
  enumerable: true,
  get: function () {
    return _controllers.ProjectController;
  }
});
Object.defineProperty(exports, "PanelController", {
  enumerable: true,
  get: function () {
    return _controllers.PanelController;
  }
});
Object.defineProperty(exports, "InvitationController", {
  enumerable: true,
  get: function () {
    return _controllers.InvitationController;
  }
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _models = require("./models");

var _repositories = require("./repositories");

var _services = require("./services");

var _controllers = require("./controllers");

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ProjectRouter = _express.default.Router();

ProjectRouter.post('/', _middlewares.auth, _controllers.ProjectController.create);
ProjectRouter.get('/', _middlewares.auth, _controllers.ProjectController.getMyProjects);
ProjectRouter.get('/public', _middlewares.auth, _controllers.ProjectController.getPublicProjects);
ProjectRouter.patch('/', _middlewares.auth, _controllers.ProjectController.update);
ProjectRouter.patch('/collaborator/up', _middlewares.auth, _controllers.ProjectController.changeToManager);
ProjectRouter.patch('/collaborator/down', _middlewares.auth, _controllers.ProjectController.changeToCollaborator);
ProjectRouter.patch('/collaborator/delete', _middlewares.auth, _controllers.ProjectController.removeCollaborator);
ProjectRouter.delete('/:projectId', _middlewares.auth, _controllers.ProjectController.remove);
ProjectRouter.post('/panel', _middlewares.auth, _controllers.PanelController.create);
ProjectRouter.get('/panel/:projectId', _middlewares.auth, _controllers.PanelController.getProjectPanels);
ProjectRouter.patch('/panel', _middlewares.auth, _controllers.PanelController.update);
ProjectRouter.patch('/panel/position', _middlewares.auth, _controllers.PanelController.changePosition);
ProjectRouter.post('/panel/task', _middlewares.auth, _controllers.PanelController.addTask);
ProjectRouter.patch('/panel/task', _middlewares.auth, _controllers.PanelController.updateTask);
ProjectRouter.patch('/panel/task/change', _middlewares.auth, _controllers.PanelController.changePanel);
ProjectRouter.delete('/panel/task', _middlewares.auth, _controllers.PanelController.removeTask);
ProjectRouter.delete('/panel/delete', _middlewares.auth, _controllers.PanelController.remove);
ProjectRouter.post('/invitation', _middlewares.auth, _controllers.InvitationController.create);
ProjectRouter.get('/invitation', _middlewares.auth, _controllers.InvitationController.getMyInvitations);
ProjectRouter.get('/invitation/:projectId', _middlewares.auth, _controllers.InvitationController.getProjectInvitations);
ProjectRouter.patch('/invitation/accept', _middlewares.auth, _controllers.InvitationController.acceptInvitation);
ProjectRouter.patch('/invitation/deny', _middlewares.auth, _controllers.InvitationController.denyInvitation);
ProjectRouter.delete('/invitation/delete', _middlewares.auth, _controllers.InvitationController.remove);
var _default = ProjectRouter;
exports.default = _default;