import db from '$lib/mongodb/db';


export type Chores = {
    _id: string;
    details: string;
}




//export const chores = db.collection<Chores>('chores');

export const allChores: Array<Chores> = [
    { _id: "vaccuming", details: "pretty self explanitary" }
]

//chores.insertOne({_id: "vaccuming", details: "pretty self explanitary"});