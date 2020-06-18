import express from 'express';
import { User } from './models';
import { UserRepository } from './repositories';
import { UserService, UploadService } from './services';
import { UserController } from './controllers';
import { upload, auth } from '../../middlewares';

let UserRouter = express.Router();
UserRouter.post('/signup', upload.single('avatar'), UserController.signup);
UserRouter.post('/signin', UserController.signin);
UserRouter.patch('/edit/avatar', [upload.single('avatar'), auth], UserController.editAvatar);
UserRouter.patch('/edit', auth, UserController.editFullname);

export {
    User,
    UserRepository,
    UserService,
    UploadService,
    UserController
};

export default UserRouter;