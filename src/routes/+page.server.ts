import { connectToDatabase } from "$lib/mongodb/db";
import { collections } from "$lib/mongodb/collections";

connectToDatabase();

//PersonModel.create({name: "Amber", choresDone: { chores: [], total: 0 }, cookingDone: { days: [], total: 0 }});

collections.people.insertOne({
    name: "tasman",
    choresDone: { 
        chores: { 
            vaccuming: 0 
        },
        total: 0
    },
    cookingDone: {
        day: {
            mon: 0
        },
        total: 0
    }
});

export async function load()
{
    const flatMembers = await collections.people.find({}).toArray();
    
    return {
        //allChores: chores,
        allPeople: flatMembers
    }
}


export const actions = {
    
}