import { connectToDatabase } from "$lib/mongodb/db";
//import { collections } from "$lib/mongodb/collections";
import { getUsersCooking } from "$lib/mongodb/user.js";
import { days, getRoster, updateRoster, type Roster } from "$lib/mongodb/roster";
import type { RequestEvent } from "./$types.js";
import { redirect } from "@sveltejs/kit";

connectToDatabase();


export async function load({cookies})
{
    if(cookies.get('token') == undefined)
    {
        throw redirect(302, "/login");
    }
    return {
        peopleCooking: await getUsersCooking(),
        roster: await getRoster({generateNew: false})
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