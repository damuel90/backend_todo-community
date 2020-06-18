"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const InvitationSchema = new _mongoose.Schema({
  project: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: [true, 'es requerido']
  },
  emitter: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'es requerido']
  },
  receiver: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'es requerido']
  },
  state: {
    type: String,
    default: 'waiting',
    enum: ['waiting', 'accepted', 'denied']
  }
}, {
  timestamps: {
    createdAt: true
  }
});

InvitationSchema.methods.imReceiver = function (userId) {
  let invitation = this;
  return userId == invitation.receiver;
};

var _default = (0, _mongoose.model)('invitation', InvitationSchema);

exports.default = _default;