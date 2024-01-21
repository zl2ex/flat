import db from '$lib/mongodb/db';
import { chores } from "$lib/mongodb/chore";

type ChoresDone = {
    chores: object;
    total: number;
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

export async function getPeopleCooking(): Promise<Array<User>>
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
    public chores: ChoresDone;
    public cooking: Cooking;


    constructor(name: string) 
    {
        this._id = name;

        // create an object with all the chores as keys and the value as number of times done
        let initChores = {};
        for(let i = 0; i < chores.length; i++)
        {
            Object.defineProperty(initChores, chores[i], { value: 0, enumerable: true });
        }

        this.chores = { 
            chores: initChores,
            total: 0
        };

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

//users.insertOne(new User("dylan"));

export const users = db.collection<User>('users');