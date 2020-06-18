import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, 'es requerido']
        },
        decription: {
            type: String
        },
        type: {
            type: String,
            required: [true, 'es requerido'],
            enum: ['public','private']
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'es requerido']
        },
        managers: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        collaborators: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

ProjectSchema.methods.imCreator = function(userId){
    let project = this;
    return userId == project.creator;
};

ProjectSchema.methods.imManager = function(userId){
    let managers = [...this.managers];
    for (const manager of managers) {
        if(userId == manager) {
            return true;
        }
    }
    return false;
};

ProjectSchema.methods.imCollaborator = function(userId){
    const { managers = [], collaborators = [] } = this;
    for (const collaborator of collaborators) {
        if(userId == collaborator) return true;
    }
    for (const manager of managers) {
        if(userId == manager) return true;
    }
    return false;
};

export default model('project', ProjectSchema);