import mongoose from 'mongoose';
import { ChoreModel, type Chore } from './chore';



export type ChoresDone = {
    chores: object;
    total: number;
}

export type Days = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];


export type CookingDone = {
    day: object; 
    total: number;
}

export type Person = {
    name: string;
    choresDone: ChoresDone;
    cookingDone: CookingDone;
}

const PersonSchema = new mongoose.Schema<Person>({
    name: {
        type: String,
        reqired: true
    },
    choresDone: {
        type: Object,
        required: true
    },
    cookingDone: {
        type: Object,
        required: true
    }
});


// WIP only overwrite if it doesnt exist

 export const PersonModel = mongoose.model<Person>('Persons', PersonSchema);