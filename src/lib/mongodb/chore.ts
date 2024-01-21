import db from '$lib/mongodb/db';


export type Chores = {
    _id: string;
    details: string;
}




export const chores = db.collection<Chores>('chores');

//chores.insertOne({_id: "vaccuming", details: "pretty self explanitary"});