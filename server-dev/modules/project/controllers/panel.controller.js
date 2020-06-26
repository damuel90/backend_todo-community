import { PanelService } from '../services';

const create = async (req, res) => {
    try {
        const { body, user: { userId } } = req;
        const createdPanel = await PanelService.create(userId, body);
        return res.status(201).send(createdPanel)
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const getProjectPanels = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId } = req.params;
        const panels = await PanelService.getProjectPanels(projectId, userId);
        return res.status(201).send(panels)
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const update = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, panelId, ...data } = req.body;
        await PanelService.update(projectId, userId, panelId, data);
        return res.status(200).send({
            message: 'El panel se actualizó con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const changePosition = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, panelId, startPos, endPos } = req.body;
        await PanelService.changePosition(projectId, userId, panelId, startPos, endPos);
        return res.status(200).send({
            message: 'El panel se actualizó con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const addTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, panelId, ...task } = req.body;
        const createdtask = await PanelService.addTask(projectId, userId, panelId, task);
        return res.status(201).send({ task: createdtask })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, panelId, taskId, ...data } = req.body;
        await PanelService.updateTask(projectId, userId, panelId, taskId, data);
        return res.status(200).send({
            message: 'La tarea se actualizó con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const removeTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, panelId, taskId } = req.body;
        await PanelService.removeTask(projectId, userId, panelId, taskId);
        return res.status(200).send({
            message: 'La tarea se ha eliminado con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const changePanel = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, panel1Id, panel2Id, taskId } = req.body;
        await PanelService.changePanel(projectId, userId, panel1Id, panel2Id, taskId);
        return res.status(200).send({
            message: 'La tarea se actualizó con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

const remove = async (req, res) => {
    try {
        const { userId } = req.user;
        const { projectId, panelId, panelPosition } = req.body;
        await PanelService.remove(projectId, userId, panelId, panelPosition);
        return res.status(200).send({
            message: 'El panel se ha eliminado con exito'
        })
    } catch (error) {
        const { status = 500, message = 'Ocurrió un error en el servidor' } = error;
        return res.status(status).send({ message });
    }
};

export default {
    create,
    getProjectPanels,
    update,
    changePosition,
    addTask,
    updateTask,
    removeTask,
    changePanel,
    remove
};