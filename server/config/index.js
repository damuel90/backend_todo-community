"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLOUDINARY_SECRET = exports.CLOUDINARY_KEY = exports.CLOUDINARY_NAME = exports.CACHE_KEY = exports.JWT_EXPIRE = exports.JWT_SECRET = exports.API_NAME = exports.MONGO_URI = exports.PORT = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const PORT = process.env.PORT || 8888;
exports.PORT = PORT;
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${process.env.API_NAME}`;
exports.MONGO_URI = MONGO_URI;
const API_NAME = process.env.API_NAME;
exports.API_NAME = API_NAME;
const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
exports.JWT_EXPIRE = JWT_EXPIRE;
const CACHE_KEY = process.env.CACHE_KEY;
exports.CACHE_KEY = CACHE_KEY;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
exports.CLOUDINARY_NAME = CLOUDINARY_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
exports.CLOUDINARY_KEY = CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
exports.CLOUDINARY_SECRET = CLOUDINARY_SECRET;