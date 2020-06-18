import { UploadRepository } from '../repositories';

const file = async (file) => {
    return await UploadRepository.file(file);
};

const files = async (files) => {
    return await UploadRepository.files(files);
};

export default {
    file,
    files
};