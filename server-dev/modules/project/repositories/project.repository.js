import { Project } from '../models';
import { User } from '../../user';

const create = async (project) => {
    const createdProject = await Project.create(project);
    return await User.populate(createdProject, [
        { path: 'managers', select: ['fullName', 'avatar'] },
        { path: 'collaborators', select: ['fullName', 'avatar'] }
    ]);
};

const getById = async (projectId) => {
    return await Project.findById(projectId);
};

const getAllPublic = async () => {
    return await Project.find({ type: 'public' }).populate([
        { path: 'creator', model: 'user', select: ['fullName', 'avatar'] },
        { path: 'managers', model: 'user', select: ['fullName', 'avatar'] },
        { path: 'collaborators', model: 'user', select: ['fullName', 'avatar'] }
    ]);
};

const getByCreator = async (userId) => {
    return await Project.find({ creator: userId });
};

const getByUser = async (userId) => {
    return await Project.find({
        $or: [
            { managers: userId }, 
            { collaborators: userId }
        ]
    }).populate([
        { path: 'managers', model: 'user', select: ['fullName', 'avatar'] },
        { path: 'collaborators', model: 'user', select: ['fullName', 'avatar'] }
    ]);
};

const update = async (projectId, data) => {
    return await Project.findByIdAndUpdate(projectId, data, { new: true });
};

const addCollaborator = async (projectId, userId) => {
    const updatedProject = await Project.updateOne({ _id: projectId }, { $push: { collaborators: userId } });
    if(updatedProject.n > 0 && updatedProject.ok > 0){
        return true;
    };
    return  false;
};

const changeToManager = async (projectId, collaboratorId) => {
    const updatedProject = await Project.updateOne(
        { 
            _id: projectId,
            collaborators: collaboratorId 
        }, 
        { 
            $push: { managers: collaboratorId },
            $pull: { collaborators: collaboratorId } 
        }
    );
    if(updatedProject.n > 0 && updatedProject.ok > 0){
        return true;
    };
    return  false;
};

const changeToCollaborator = async (projectId, collaboratorId) => {
    const updatedProject = await Project.updateOne(
        { 
            _id: projectId,
            managers: collaboratorId
        }, 
        { 
            $push: { collaborators: collaboratorId },
            $pull: { managers: collaboratorId } 
        }
    );
    if(updatedProject.n > 0 && updatedProject.ok > 0){
        return true;
    };
    return  false;
};

const removeCollaborator = async (projectId, collaboratorId) => {
    const updatedProject = await Project.updateOne(
        { 
            _id: projectId,
            $or: [
                { managers: collaboratorId },
                { collaborators: collaboratorId }
            ]
        }, 
        { 
            $pull: { managers: collaboratorId, collaborators: collaboratorId } 
        }
    );
    if(updatedProject.n > 0 && updatedProject.ok > 0){
        return true;
    };
    return  false;
};

const remove = async (projectId, userId) => {
    return await Project.findOneAndRemove({ _id: projectId, creator: userId });
};

export default {
    create,
    getById,
    getAllPublic,
    getByCreator,
    getByUser,
    update,
    addCollaborator,
    removeCollaborator,
    changeToManager,
    changeToCollaborator,
    remove
};