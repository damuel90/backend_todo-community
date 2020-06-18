"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _middlewares = require("./middlewares");

var _user = _interopRequireDefault(require("./modules/user"));

var _project = _interopRequireDefault(require("./modules/project"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// packeges
// middlewares
// modules
const app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _compression.default)());
app.use('/upload', _express.default.static(__dirname + '/uploads'));
app.use('/v1/api/user', _user.default);
app.use('/v1/api/project', _project.default);
app.use(_middlewares.notFound);
app.use(_middlewares.serverError);
var _default = app;
exports.default = _default;