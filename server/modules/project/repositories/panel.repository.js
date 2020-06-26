"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _mongoose = require("mongoose");

const create = async panel => {
  return await _models.Panel.create(panel);
};

const getById = async panelId => {
  return await _models.Panel.findById(panelId);
};

const getByProject = async projectId => {
  return await _models.Panel.find({
    project: projectId
  }).populate([{
    path: 'tasks.assigned',
    model: 'user',
    select: ['fullName', 'avatar']
  }]).sort({
    position: 1
  });
};

const update = async (panelId, data) => {
  return await _models.Panel.findByIdAndUpdate(panelId, data, {
    new: true
  });
};

const addTask = async (panelId, task) => {
  const updatedPanel = await _models.Panel.findOneAndUpdate({
    "_id": panelId
  }, {
    $push: {
      "tasks": task
    }
  }, {
    new: true
  });
  const {
    tasks = []
  } = updatedPanel;
  return tasks[tasks.length - 1];
};

const getTask = async (panelId, taskId) => {
  return await _models.Panel.aggregate([{
    $match: {
      _id: _mongoose.Types.ObjectId(panelId)
    }
  }, {
    $project: {
      _id: false,
      tasks: true
    }
  }, {
    $unwind: "$tasks"
  }, {
    $match: {
      "tasks._id": _mongoose.Types.ObjectId(taskId)
    }
  }, {
    $replaceRoot: {
      newRoot: "$tasks"
    }
  }]);
};

const updateTask = async (panelId, taskId, data) => {
  const updatedPanel = await _models.Panel.updateOne({
    "_id": panelId,
    "tasks._id": taskId
  }, {
    $set: {
      "tasks.$": data
    }
  });
  if (updatedPanel.n > 0 && updatedPanel.ok > 0) return true;
  return false;
};

const removeTask = async (panelId, taskId) => {
  const updatedPanel = await _models.Panel.updateOne({
    "_id": panelId,
    "tasks._id": taskId
  }, {
    $pull: {
      tasks: {
        _id: taskId
      }
    }
  });
  if (updatedPanel.n > 0 && updatedPanel.ok > 0) return true;
  return false;
};

const decreasePosition = async (start, end) => {
  return await _models.Panel.updateMany({
    $and: [{
      position: {
        $gt: start
      }
    }, {
      position: {
        $lte: end
      }
    }]
  }, {
    $inc: {
      position: -1
    }
  });
};

const increasePosition = async (start, end) => {
  return await _models.Panel.updateMany({
    $and: [{
      position: {
        $lt: start
      }
    }, {
      position: {
        $gte: end
      }
    }]
  }, {
    $inc: {
      position: 1
    }
  });
};

const remove = async panelId => {
  return await _models.Panel.findByIdAndDelete(panelId);
};

var _default = {
  create,
  getById,
  getByProject,
  update,
  addTask,
  getTask,
  updateTask,
  removeTask,
  decreasePosition,
  increasePosition,
  remove
};
exports.default = _default;