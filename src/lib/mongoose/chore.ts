import mongoose from 'mongoose';

export type Chore = string;


const ChoreSchema = new mongoose.Schema({
    chore: {
        type: String,
        reqired: true
    }
});


// WIP only overwrite if it doesnt exist

 export const ChoreModel = mongoose.model('Chores', ChoreSchema);