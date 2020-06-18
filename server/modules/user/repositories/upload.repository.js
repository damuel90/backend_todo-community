"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _config = require("../../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cloudinary.default.config({
  cloud_name: _config.CLOUDINARY_NAME,
  api_key: _config.CLOUDINARY_KEY,
  api_secret: _config.CLOUDINARY_SECRET
});

const file = async file => {
  let uploadedFile = await _cloudinary.default.v2.uploader.upload(file.path);
  return uploadedFile.secure_url;
};

const files = async files => {
  const urls = [];

  for (const file of files) {
    const url = await uploadFile(file);
    urls.push(url);
  }

  return urls;
};

var _default = {
  file,
  files
};
exports.default = _default;