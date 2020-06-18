import express from 'express';
import { Project, Task, Invitation } from './models';
import { ProjectRepository, TaskRepository, InvitationRepository } from './repositories';
import { ProjectService, TaskService, InvitationService } from './services';
import { ProjectController, TaskController, InvitationController } from './controllers';
import { auth } from '../../middlewares';

let ProjectRouter = express.Router();

ProjectRouter.post('/', auth, ProjectController.create);
ProjectRouter.get('/', auth, ProjectController.getMyProjects);
ProjectRouter.get('/public', auth, ProjectController.getPublicProjects);
ProjectRouter.patch('/', auth, ProjectController.update);
ProjectRouter.patch('/collaborator/up', auth, ProjectController.changeToManager);
ProjectRouter.patch('/collaborator/down', auth, ProjectController.changeToCollaborator);
ProjectRouter.patch('/collaborator/delete', auth, ProjectController.removeCollaborator);
ProjectRouter.delete('/:projectId', auth, ProjectController.remove);

ProjectRouter.post('/task', auth, TaskController.create);
ProjectRouter.get('/task/:projectId', auth, TaskController.getProjectTasks);
ProjectRouter.patch('/task', auth, TaskController.update);
ProjectRouter.patch('/task/collaborator', auth, TaskController.completedTask);
ProjectRouter.delete('/task/delete', auth, TaskController.remove);

ProjectRouter.post('/invitation', auth, InvitationController.create);
ProjectRouter.get('/invitation', auth, InvitationController.getMyInvitations);
ProjectRouter.get('/invitation/:projectId', auth, InvitationController.getProjectInvitations);
ProjectRouter.patch('/invitation/accept', auth, InvitationController.acceptInvitation);
ProjectRouter.patch('/invitation/deny', auth, InvitationController.denyInvitation);
ProjectRouter.delete('/invitation/delete', auth, InvitationController.remove);

export {
    Project, 
    Task, 
    Invitation,
    TaskRepository,
    InvitationRepository,
    ProjectRepository,
    ProjectService,
    TaskService,
    InvitationService,
    ProjectController,
    TaskController,
    InvitationController
};

export default ProjectRouter;