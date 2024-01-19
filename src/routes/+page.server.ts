import { connectToDatabase } from "$lib/mongodb/db";
//import { collections } from "$lib/mongodb/collections";
import { getPeopleCooking } from "$lib/mongodb/person";
import { getRoster, type Roster } from "$lib/mongodb/roster";

connectToDatabase();

//PersonModel.create({name: "Amber", choresDone: { chores: [], total: 0 }, cookingDone: { days: [], total: 0 }});

//people.insertOne(new Person("dylan"));



export async function load()
{
    //const roster = await createRoster();

    
    
    return {
        peopleCooking: await getPeopleCooking(),
        roster: await getRoster()
    }
}


export const actions = {
    
}