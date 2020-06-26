import express from 'express';
import { Project, Panel, Invitation } from './models';
import { ProjectRepository, PanelRepository, InvitationRepository } from './repositories';
import { ProjectService, PanelService, InvitationService } from './services';
import { ProjectController, PanelController, InvitationController } from './controllers';
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

ProjectRouter.post('/panel', auth, PanelController.create);
ProjectRouter.get('/panel/:projectId', auth, PanelController.getProjectPanels);
ProjectRouter.patch('/panel', auth, PanelController.update);
ProjectRouter.patch('/panel/position', auth, PanelController.changePosition);
ProjectRouter.post('/panel/task', auth, PanelController.addTask);
ProjectRouter.patch('/panel/task', auth, PanelController.updateTask);
ProjectRouter.patch('/panel/task/change', auth, PanelController.changePanel);
ProjectRouter.delete('/panel/task', auth, PanelController.removeTask);
ProjectRouter.delete('/panel/delete', auth, PanelController.remove);

ProjectRouter.post('/invitation', auth, InvitationController.create);
ProjectRouter.get('/invitation', auth, InvitationController.getMyInvitations);
ProjectRouter.get('/invitation/:projectId', auth, InvitationController.getProjectInvitations);
ProjectRouter.patch('/invitation/accept', auth, InvitationController.acceptInvitation);
ProjectRouter.patch('/invitation/deny', auth, InvitationController.denyInvitation);
ProjectRouter.delete('/invitation/delete', auth, InvitationController.remove);

export {
    Project,  
    Panel,
    Invitation,
    ProjectRepository,
    PanelRepository,
    InvitationRepository,
    ProjectService,
    PanelService,
    InvitationService,
    ProjectController,
    PanelController,
    InvitationController
};

export default ProjectRouter;