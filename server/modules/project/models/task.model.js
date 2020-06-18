"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const TaskSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: [true, 'es requerido'],
    lowercase: true
  },
  description: {
    type: String
  },
  project: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: [true, 'es requerido']
  },
  creator: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'es requerido']
  },
  expire: {
    type: Date
  },
  assigned: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

TaskSchema.methods.imAssigned = function (userId) {
  let task = this;
  return userId == task.assigned;
};

var _default = (0, _mongoose.model)('task', TaskSchema);

exports.default = _default;