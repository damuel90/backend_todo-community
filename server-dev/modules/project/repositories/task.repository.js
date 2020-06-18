import { Task } from '../models';
import { User } from '../../user';

const create = async (task) => {
    const createdTask = await Task.create(task);
    return await User.populate(createdTask, [
        { path: 'creator', select: ['fullName', 'avatar'] },
        { path: 'assigned', select: ['fullName', 'avatar'] }
    ]);
};

const getById = async (taskId) => {
    return await Task.findById(taskId);
};

const getByProject = async (projectId) => {
    return await Task.find({ project: projectId }).populate([
        { path: 'creator', model: 'user', select: ['fullName', 'avatar'] },
        { path: 'assigned', model: 'user', select: ['fullName', 'avatar'] }
    ]);
};

const update = async (taskId, data) => {
    return await Task.findByIdAndUpdate(taskId, data, { new: true });
};

const remove = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};

export default {
    create,
    getById,
    getByProject,
    update,
    remove  
};