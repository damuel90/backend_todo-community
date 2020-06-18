"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _app = _interopRequireDefault(require("./app"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const runServer = () => _app.default.listen(_config.PORT, () => console.log(`${_config.API_NAME}: API running on port ${_config.PORT}`));

_mongoose.default.connect(_config.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(runServer).catch(console.log);