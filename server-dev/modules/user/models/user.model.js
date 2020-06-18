import { Schema, model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'es requerido'],
            lowercase: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'es requerido']
        },
        password: {
            type: String,
            required: [true, 'es requerido']
        },
        avatar: {
            type: String
        }                                       
    },
    {
       timestamps: {
           createdAt: true,
           updatedAt: true
       }
    }   
);

UserSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePassword = function(password){
    let user = this;
    return compareSync(password, user.password);
};

UserSchema.pre('save', function(next){
    let user = this;

    if(!user.isModified('password')){
        next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

export default model('user', UserSchema);