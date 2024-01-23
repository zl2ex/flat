import db from '$lib/mongodb/db';
import { allChores } from "$lib/mongodb/chore";

type ChoresDone = {
    chore: string;
    count: number;
};

type Day = {
    day: string;
    count: number;
};


type Cooking = {
    stats: Array<Day>;
    lastCooked: Date;
    isCooking: boolean;
    isCookingNextWeek: boolean;
    total: number;
};

export async function getUsersCooking(): Promise<Array<User>>
{
    let peopleCooking: Array<User> = [];
    const allPeople = await users.find({}).toArray();
    for(let i = 0; i < allPeople.length; i++)
    {
        if(allPeople[i].cooking.isCooking) 
        {
            peopleCooking.push(allPeople[i]);
        }
    }
    return peopleCooking;
}

export class User
{
    public _id: string;
    public chores: Array<ChoresDone>;
    public cooking: Cooking;

    constructor(name: string) 
    {
        this._id = name;

        let initChores = [];
        for(let i = 0; i < allChores.length; i++)
        {
            initChores[i] = { chore: allChores[i]._id, count: 0 };
        }

        this.chores = initChores;

        this.cooking = {
            stats: [
                { day: "mon", count: 0 },
                { day: "tue", count: 0 },
                { day: "wed", count: 0 },
                { day: "thu", count: 0 },
                { day: "fri", count: 0 },
                { day: "sat", count: 0 },
                { day: "sun", count: 0 },
            ],
            lastCooked: new Date,
            isCooking: true,
            isCookingNextWeek: true,
            total: 0
        }
    }
}


export const users = db.collection<User>('users');

//users.insertOne(new User("dylan"));