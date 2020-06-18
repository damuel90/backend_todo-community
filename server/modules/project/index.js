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
Object.defineProperty(exports, "Task", {
  enumerable: true,
  get: function () {
    return _models.Task;
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
Object.defineProperty(exports, "TaskRepository", {
  enumerable: true,
  get: function () {
    return _repositories.TaskRepository;
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
Object.defineProperty(exports, "TaskService", {
  enumerable: true,
  get: function () {
    return _services.TaskService;
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
Object.defineProperty(exports, "TaskController", {
  enumerable: true,
  get: function () {
    return _controllers.TaskController;
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
ProjectRouter.post('/task', _middlewares.auth, _controllers.TaskController.create);
ProjectRouter.get('/task/:projectId', _middlewares.auth, _controllers.TaskController.getProjectTasks);
ProjectRouter.patch('/task', _middlewares.auth, _controllers.TaskController.update);
ProjectRouter.patch('/task/collaborator', _middlewares.auth, _controllers.TaskController.completedTask);
ProjectRouter.delete('/task/delete', _middlewares.auth, _controllers.TaskController.remove);
ProjectRouter.post('/invitation', _middlewares.auth, _controllers.InvitationController.create);
ProjectRouter.get('/invitation', _middlewares.auth, _controllers.InvitationController.getMyInvitations);
ProjectRouter.get('/invitation/:projectId', _middlewares.auth, _controllers.InvitationController.getProjectInvitations);
ProjectRouter.patch('/invitation/accept', _middlewares.auth, _controllers.InvitationController.acceptInvitation);
ProjectRouter.patch('/invitation/deny', _middlewares.auth, _controllers.InvitationController.denyInvitation);
ProjectRouter.delete('/invitation/delete', _middlewares.auth, _controllers.InvitationController.remove);
var _default = ProjectRouter;
exports.default = _default;