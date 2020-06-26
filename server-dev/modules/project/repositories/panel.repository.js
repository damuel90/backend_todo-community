import { Panel } from '../models';
import { Types } from 'mongoose';

const create = async (panel) => {
    return await Panel.create(panel);
};

const getById = async (panelId) => {
    return await Panel.findById(panelId);
};

const getByProject = async (projectId) => {
    return await Panel.find({ project: projectId }).populate([
        { path: 'tasks.assigned', model: 'user', select: ['fullName', 'avatar'] }
    ]).sort({ position: 1 });
};

const update = async (panelId, data) => {
    return await Panel.findByIdAndUpdate(panelId, data, { new: true });
};

const addTask = async (panelId, task) => {
    const updatedPanel = await Panel.findOneAndUpdate({ "_id": panelId }, { $push: { "tasks": task } }, { new: true });
    const { tasks = [] } = updatedPanel;
    return tasks[tasks.length-1];
};

const getTask = async (panelId, taskId) => {
    return await Panel.aggregate([
        { $match: { _id: Types.ObjectId(panelId) } },
        { $project: { _id: false, tasks: true } },
        { $unwind: "$tasks"},
        { $match: { "tasks._id": Types.ObjectId(taskId) } },
        { $replaceRoot: { newRoot: "$tasks" } }
    ]);
};

const updateTask = async (panelId, taskId, data) => {
    const updatedPanel = await Panel.updateOne({ "_id": panelId, "tasks._id": taskId }, { $set: { "tasks.$": data } });
    if(updatedPanel.n > 0 && updatedPanel.ok > 0) return true;
    return  false;
};

const removeTask = async (panelId, taskId) => {
    const updatedPanel = await Panel.updateOne({ "_id": panelId, "tasks._id": taskId }, {$pull: {tasks: { _id : taskId }}});
    if(updatedPanel.n > 0 && updatedPanel.ok > 0) return true;
    return  false;
};

const decreasePosition = async (start, end) => {
    return await Panel.updateMany(
        {$and: [
            { position: { $gt: start } },
            { position: { $lte: end } }
        ]}, 
        { 
           $inc: { position: -1 }
        }
    );
};

const increasePosition = async (start, end) => {
    return await Panel.updateMany(
        {$and: [
            { position: { $lt: start } },
            { position: { $gte: end } }
        ]}, 
        { 
           $inc: { position: 1 }
        }
    );
};

const remove = async (panelId) => {
    return await Panel.findByIdAndDelete(panelId);
};

export default {
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