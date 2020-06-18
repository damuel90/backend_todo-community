import { ProjectRepository, InvitationRepository } from '../repositories';
import { showError } from '../../../helpers';

const checkInvitation = (invitations, receiver) => {
    for (const invited of invitations) {
        if(invited.receiver._id == receiver){
            if(invited.state == 'waiting'){
                return [true, 'Ya envió una invitación a este usuario'];
            } else if(invited.state == 'accepted'){
                return [true, 'Este usuario ya aceptó la invitación a colaborar'];
            }
            break;
        }
    }
    return [false];
};

const create = async (invitation) => {
    const invitations = await InvitationRepository.getByProject(invitation.project);
    const [ invited, message ] = checkInvitation(invitations);
    if(invited){
        throw showError(400, message);
    }
    const project = await ProjectRepository.getById(invitation.project);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const creator = project.imCreator(invitation.emitter);
    if(!creator){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    return await InvitationRepository.create(invitation);
};

const getProjectInvitations = async (projectId, userId) => {
    if(!projectId){
        throw showError(400, 'No envió el id del proyecto')
    }
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const creator = project.imCreator(userId);
    if(!creator){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    return await InvitationRepository.getByProject(projectId);
};

const getUserInvitations = async (userId) => {
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    return await InvitationRepository.getByUser(userId);
};

const acceptInvitation = async (invitationId, collaboratorId, userId) => {
    if(!invitationId){
        throw showError(400, 'No envió el id de la invitación');
    }
    if(!userId || !collaboratorId){
        throw showError(400, 'No envió el id del usuario');
    }
    const invitation = await InvitationRepository.getById(invitationId);
    if(!invitation){
        throw showError(500, 'La invitacion no existe o fue eliminada');
    }
    const receiver = invitation.imReceiver(userId);
    if(!receiver){
        throw showError(500, 'No tiene las credenciales para realizar esta acción');
    }
    if(invitation.state !== 'waiting'){
        const state = invitation.state === 'accepted' ? 'aceptada' : 'rechazada';
        throw showError(500, `La invitación ya fue ${state}`);
    }
    const addedCollaborator = await ProjectRepository.addCollaborator(invitation.project, collaboratorId);
    if(!addedCollaborator){
        throw showError(500, 'Ocurrió un error en el servidor');
    }
    return await InvitationRepository.update(invitationId, { state: 'accepted' });
};

const denyInvitation = async (invitationId, userId) => {
    if(!invitationId){
        throw showError(400, 'No envió el id de la invitación');
    }
    if(!userId){
        throw showError(400, 'No envió el id del usuario');
    }
    const invitation = await InvitationRepository.getById(invitationId);
    if(!invitation){
        throw showError(500, 'La invitacion no existe o fue eliminada');
    }
    const receiver = invitation.imReceiver(userId);
    if(!receiver){
        throw showError(500, 'No tiene las credenciales para realizar esta acción');
    }
    if(invitation.state !== 'waiting'){
        const state = invitation.state === 'accepted' ? 'aceptada' : 'rechazada';
        throw showError(500, `La invitación ya fue ${state}`);
    }
    return await InvitationRepository.update(invitationId, { state: 'denied' });
};

const remove = async (projectId, userId, invitationId) => {
    if(!projectId){
        throw showError(400, 'No envió el id del proyecto')
    }
    if(!userId){
        throw showError(400, 'No envió el id del usuario')
    }
    if(!invitationId){
        throw showError(400, 'No envió el id de la invitación')
    }
    const project = await ProjectRepository.getById(projectId);
    if(!project){
        throw showError(500, 'El projecto no existe');
    }
    const creator = project.imCreator(userId);
    if(!creator){
        throw showError(500, 'No tiene las credenciales para realizar esta acción')
    }
    const deletedInvitation = await InvitationRepository.remove(invitationId);
    if(!deletedInvitation){
        throw showError(500, 'La invitación no existe');
    }
    return deletedInvitation;
};

export default {
    create,
    getProjectInvitations,
    getUserInvitations,
    acceptInvitation,
    denyInvitation,
    remove
};