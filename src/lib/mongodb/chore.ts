import db from '$lib/mongodb/db';


export type Chores = {
    name: string;
}

export const chores = [ //  = db.collection<Chores>('chores');
    "vaccuming",
    "moping"
];