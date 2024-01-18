import db from '$lib/mongodb/db';


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

export const people = db.collection<Person>('people');