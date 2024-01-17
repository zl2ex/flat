import mongoose from 'mongoose';

export type Chore = {
    name: string;
    email: string;
};

export interface ChoreInput extends Chore {
    password: string;
};

export interface ChoreDocument extends ChoreInput, mongoose.Document {
    
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});



userSchema.pre('save', async function (this: ChoreDocument) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

// WIP only overwrite if it doesnt exist

 export const UserModel = mongoose.model('User', userSchema);