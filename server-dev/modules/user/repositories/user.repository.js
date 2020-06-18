import { User } from '../models';

const create = async (user) => {
   return await User.create(user)
};

const get = async (userId) => {
    return await User.findById(userId)
};

const getByEmail = async (email) => {
    return await User.findOne({ email });
};

const getAll = async () => {
    return await User.find();
};

const update = async (userId, data) => {
    return await User.findByIdAndUpdate(userId, data, { new: true });
};

export default {
    create,
    get,
    getByEmail,
    getAll,
    update
};