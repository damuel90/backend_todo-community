import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'es requerido'],
            lowercase: true
        },
        description: {
            type: String
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'project',
            required: [true, 'es requerido'],
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'es requerido'],
        },
        expire: {
            type: Date
        },
        assigned: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

TaskSchema.methods.imAssigned = function(userId){
    let task = this;
    return userId == task.assigned;
};

export default model('task', TaskSchema);