import { InvitationService } from '../services';

const create = async (req, res) => {
    try {
        const { userId } = req.user;
        let body = {...req.body, emitter: userId};
        await InvitationService.create(body);
        return res.status(200).send({
            status: 200,
            message: 'La invitación a colaborar ha sido enviada'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const getProjectInvitations = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId } = req.params;
        const invitations = await InvitationService.getProjectInvitations(projectId, userId);
        return res.status(201).send({
            status: 201,
            data: invitations
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const getMyInvitations = async (req, res) => {
    try {
        const { userId } = req.user;
        const myInvitations = await InvitationService.getUserInvitations(userId);
        return res.status(201).send({
            status: 201,
            data: myInvitations
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const acceptInvitation = async (req, res) => {
    try {
        const { userId } = req.user;
        const { invitationId, collaboratorId } = req.body;
        await InvitationService.acceptInvitation(invitationId, collaboratorId, userId);
        return res.status(200).send({
            status: 200,
            message: 'Se ha unido a colaborar'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const denyInvitation = async (req, res) => {
    try {
        const { userId } = req.user;
        const { invitationId } = req.body;
        await InvitationService.denyInvitation(invitationId, userId);
        return res.status(200).send({
            status: 200,
            message: 'ha rechazador unirse a colaborar'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

const remove = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, invitationId } = req.body;
        await InvitationService.remove(projectId, userId, invitationId);
        return res.status(200).send({
            status: 200,
            message: 'Se ha eliminado la invitación con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ status, message });
    }
};

export default {
    create,
    getProjectInvitations,
    getMyInvitations,
    acceptInvitation,
    denyInvitation,
    remove
};