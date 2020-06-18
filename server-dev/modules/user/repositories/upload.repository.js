import cloudinary from 'cloudinary';
import { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } from '../../../config';

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET
});

const file = async (file) => {
    let uploadedFile = await cloudinary.v2.uploader.upload(file.path); 
    return uploadedFile.secure_url;
};

const files = async (files) => {
    const urls = [];
    for (const file of files) {
        const url = await uploadFile(file);
        urls.push(url);
    }
    return urls;
};

export default {
    file,
    files
};