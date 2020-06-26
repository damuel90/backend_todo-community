import { ProjectRepository, InvitationRepository } from '../repositories';
import { isCreator } from './project.service';
import { showError, verifyParams } from '../../../helpers';

const checkInvitation = (invitations, receiver) => {
    for (const invited of invitations) {
        if(invited.receiver._id == receiver){
            if(invited.state == 'waiting'){
                return [true, 'Ya envió una invitación a este usuario'];
            } else if(invited.state == 'accepted'){
                return [true, 'Este usuario ya aceptó la invitación a colaborar'];
            } else {
                return [true, 'Este usuario rechazó la invitación a colaborar'];
            }
            break;
        }
    }
    return [false];
};

const validInvitation = async (invitationId, userId) => {
    const invitation = await InvitationRepository.getById(invitationId);
    if(!invitation){
        return [false, 'La invitacion no existe o fue eliminada'];
    }
    const receiver = invitation.imReceiver(userId);
    if(!receiver){
        [false, 'No tiene las credenciales para realizar esta acción'];
    }
    if(invitation.state !== 'waiting'){
        const state = invitation.state === 'accepted' ? 'aceptada' : 'rechazada';
        return [false, `La invitación ya fue ${state}`];
    }
    return [true];
};

const create = async (invitation) => {
    const invitations = await InvitationRepository.getByProject(invitation.project);
    const [ invited, message ] = checkInvitation(invitations, invitation.receiver);
    if(invited){
        throw showError(400, message);
    }
    const [creator, creatorError] = await isCreator(invitation.project, invitation.emitter);
    if(!creator){
        throw showError(500, creatorError)
    }
    return await InvitationRepository.create(invitation);
};

const getProjectInvitations = async (projectId, userId) => {
    const [exists, paramError] = verifyParams({ projectId, userId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [creator, creatorError] = await isCreator(projectId, userId);
    if(!creator){
        throw showError(500, creatorError)
    }
    return await InvitationRepository.getByProject(projectId);
};

const getUserInvitations = async (userId) => {
    if(!userId){
        throw showError(400, 'No envió el userId')
    }
    return await InvitationRepository.getByUser(userId);
};

const acceptInvitation = async (projectId, invitationId, userId) => {
    const [exists, paramError] = verifyParams({ projectId, invitationId, userId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [valid, invitationError] = await validInvitation(invitationId, userId);
    if(!valid){
        throw showError(500, invitationError);
    }
    const addedCollaborator = await ProjectRepository.addCollaborator(projectId, userId);
    if(!addedCollaborator){
        throw showError(500, 'Ocurrió un error en el servidor');
    }
    return await InvitationRepository.update(invitationId, { state: 'accepted' });
};

const denyInvitation = async (invitationId, userId) => {
    const [exists, paramError] = verifyParams({ invitationId, userId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [valid, invitationError] = await validInvitation(invitationId, userId);
    if(!valid){
        throw showError(500, invitationError);
    }
    return await InvitationRepository.update(invitationId, { state: 'denied' });
};

const remove = async (projectId, invitationId, userId) => {
    const [exists, paramError] = verifyParams({ projectId, invitationId, userId });
    if(!exists){
        throw showError(400, paramError);
    }
    const [creator, creatorError] = await isCreator(projectId, userId);
    if(!creator){
        throw showError(500, creatorError)
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