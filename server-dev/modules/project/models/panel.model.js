import { Schema, model } from 'mongoose';

const PanelSchema = new Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, 'es requerido']
        },
        description: {
            type: String
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'project',
            required: [true, 'es requerido']
        },
        position: {
            type: Number,
            required: [true, 'es requerido']
        },
        tasks: [
            {
                title: {
                    type: String,
                    required: [true, 'es requerido'],
                    lowercase: true
                },
                description: {
                    type: String
                },
                expire: {
                    type: Date
                },
                assigned: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }
        ]
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

export default model('panel', PanelSchema);