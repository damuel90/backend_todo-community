"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function () {
    return _models.User;
  }
});
Object.defineProperty(exports, "UserRepository", {
  enumerable: true,
  get: function () {
    return _repositories.UserRepository;
  }
});
Object.defineProperty(exports, "UserService", {
  enumerable: true,
  get: function () {
    return _services.UserService;
  }
});
Object.defineProperty(exports, "UploadService", {
  enumerable: true,
  get: function () {
    return _services.UploadService;
  }
});
Object.defineProperty(exports, "UserController", {
  enumerable: true,
  get: function () {
    return _controllers.UserController;
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

let UserRouter = _express.default.Router();

UserRouter.post('/signup', _middlewares.upload.single('avatar'), _controllers.UserController.signup);
UserRouter.post('/signin', _controllers.UserController.signin);
UserRouter.patch('/edit/avatar', [_middlewares.upload.single('avatar'), _middlewares.auth], _controllers.UserController.editAvatar);
UserRouter.patch('/edit', _middlewares.auth, _controllers.UserController.editFullname);
var _default = UserRouter;
exports.default = _default;