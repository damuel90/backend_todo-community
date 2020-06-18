import { Invitation } from '../models';

const create = async (invitation) => {
    return await Invitation.create(invitation);
};

const getById = async (invitationId) => {
    return await Invitation.findById(invitationId);
};

const getByProject = async (projectId) => {
    return await Invitation.find({ project: projectId }).populate([
        { path: 'emitter', model: 'user', select: ['fullName', 'avatar'] },
        { path: 'receiver', model: 'user', select: ['fullName', 'avatar'] }
    ]);
};

const getByUser = async (userId) => {
    return await Invitation.find({ receiver: userId, state: 'waiting' }).populate([
        { path: 'emitter', model: 'user', select: ['fullName', 'avatar'] },
        { path: 'receiver', model: 'user', select: ['fullName', 'avatar'] }
    ]);
};

const update = async (invitationId, data) => {
    return await Invitation.findByIdAndUpdate(invitationId, data, { new: true });
};

const remove = async (invitationId) => {
    return await Invitation.findByIdAndDelete(invitationId);
};

export default {
    create,
    getById,
    getByProject,
    getByUser,
    update,
    remove
};