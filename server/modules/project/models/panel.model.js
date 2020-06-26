"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const PanelSchema = new _mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, 'es requerido']
  },
  description: {
    type: String
  },
  project: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: [true, 'es requerido']
  },
  position: {
    type: Number,
    required: [true, 'es requerido']
  },
  tasks: [{
    title: {
      type: String,
      required: [true, 'es requerido'],
      lowercase: true
    },
    description: {
      type: String
    },
    expire: {
      type: Date
    },
    assigned: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  }]
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

var _default = (0, _mongoose.model)('panel', PanelSchema);

exports.default = _default;