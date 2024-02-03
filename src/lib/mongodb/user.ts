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

export async function getUsersEating(day: number)
{
    let usersEating = 0;
    const allUsers = await users.find({}).toArray();
    for(let i = 0; i < allUsers.length; i++)
    {
        if(allUsers[i].cooking.eating[day].isEating) 
        {
            usersEating++;
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
            eating: [
                { day: "mon", isEating: false },
                { day: "tue", isEating: false },
                { day: "wed", isEating: false },
                { day: "thu", isEating: false },
                { day: "fri", isEating: false },
                { day: "sat", isEating: false },
                { day: "sun", isEating: false },
            ]
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
