import { Schema, model } from 'mongoose';

const InvitationSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: 'project',
            required: [true, 'es requerido']
        },
        emitter: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'es requerido']
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'es requerido']
        },
        state: {
            type: String,
            default: 'waiting',
            enum: ['waiting', 'accepted', 'denied']
        }
    },
    {
        timestamps: {
            createdAt: true
        }
    }
);

InvitationSchema.methods.imReceiver = function(userId){
    let invitation = this;
    return userId == invitation.receiver;
};

export default model('invitation', InvitationSchema);