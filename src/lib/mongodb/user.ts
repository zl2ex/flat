import db from '$lib/mongodb/db';
import { allChores } from "$lib/mongodb/chore";
import { days } from './roster';

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
    eating: Array<{day: string, isEating: boolean}>;
};

export async function getUsersCooking(): Promise<Array<User>>
{
    let usersCooking: Array<User> = [];
    const allUsers = await users.find({}).toArray();
    for(let i = 0; i < allUsers.length; i++)
    {
        if(allUsers[i].cooking.isCooking) 
        {
            usersCooking.push(allUsers[i]);
        }
    }
    return usersCooking;
}

// day 0=sun 1=mon ect..
export async function getUsersEating(day: number ): Promise<Array<string>>
{
    if(day < 0 || day > 6) return ["day provided out of range"];
    let usersEating: Array<string> = [];
    const allUsers = await users.find({}).toArray();
    for(let i = 0; i < allUsers.length; i++)
    {
        if(allUsers[i].cooking.eating[day].isEating) 
        {
            usersEating.push(allUsers[i]._id);
        }
    }
    return usersEating;
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

        let stats = [];
        let eating = [];
        for(let i = 0; i < days.length; i++)
        {
            stats[i] = { day: days[i], count: 0 };
            eating[i] = { day: days[i], isEating: false };
        }

        this.cooking = {
            stats: stats,
            lastCooked: new Date,
            isCooking: true,
            eating: eating
        }
    }
}

export const users = db.collection<User>('users');
/*
users.insertOne(new User("baxter"));
users.insertOne(new User("mitchell"));
users.insertOne(new User("nikita"));
users.insertOne(new User("jack"));
users.insertOne(new User("olivia"));
users.insertOne(new User("amber"));
users.insertOne(new User("dylan"));
users.insertOne(new User("tasman"));
users.insertOne(new User("ethan"));
*/

/*
users.updateOne({_id: "baxter"}, { $set: new User("baxter")});
users.updateOne({_id: "mitchell"}, { $set: new User("mitchell")});
users.updateOne({_id: "nikita"}, { $set: new User("nikita")});
users.updateOne({_id: "jack"}, { $set: new User("jack")});
users.updateOne({_id: "olivia"}, { $set: new User("olivia")});
users.updateOne({_id: "amber"}, { $set: new User("amber")});
users.updateOne({_id: "dylan"}, { $set: new User("dylan")});
users.updateOne({_id: "tasman"}, { $set: new User("tasman")});
users.updateOne({_id: "ethan"}, { $set: new User("ethan")});
*/