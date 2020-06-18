"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcrypt = require("bcrypt");

const UserSchema = new _mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'es requerido'],
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'es requerido']
  },
  password: {
    type: String,
    required: [true, 'es requerido']
  },
  avatar: {
    type: String
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.comparePassword = function (password) {
  let user = this;
  return (0, _bcrypt.compareSync)(password, user.password);
};

UserSchema.pre('save', function (next) {
  let user = this;

  if (!user.isModified('password')) {
    next();
  }

  const salt = (0, _bcrypt.genSaltSync)(10);
  const hashedPassword = (0, _bcrypt.hashSync)(user.password, salt);
  user.password = hashedPassword;
  next();
});

var _default = (0, _mongoose.model)('user', UserSchema);

exports.default = _default;