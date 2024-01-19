import { connectToDatabase } from "$lib/mongodb/db";
//import { collections } from "$lib/mongodb/collections";
import { getPeopleCooking } from "$lib/mongodb/person";
import { days, getRoster, updateRoster, type Roster } from "$lib/mongodb/roster";
import type { RequestEvent } from "./$types.js";

connectToDatabase();


export async function load()
{
    return {
        peopleCooking: await getPeopleCooking(),
        roster: await getRoster()
    }
}


export const actions = {
    updateRoster: async (event: RequestEvent) => {

        const data = await event.request.formData();
        let newRoster: Array<Roster> = [];
        for(let i = 0; i < days.length; i++)
        {
            newRoster[i] = { day: days[i], person: data.get(days[i]) as string };
        }

        console.log(newRoster);
        updateRoster(newRoster);
    }
}