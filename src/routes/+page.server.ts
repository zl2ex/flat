import { connectToDatabase } from "$lib/mongodb/db";
//import { collections } from "$lib/mongodb/collections";
import { User, getUsersCooking, users } from "$lib/mongodb/user.js";
import { days, getRoster, roster, type Roster } from "$lib/mongodb/roster";
import type { RequestEvent } from "./$types.js";
import { redirect } from "@sveltejs/kit";
import { logoutUser } from "$lib/auth/auth.js";

connectToDatabase();


export async function load({cookies, locals})
{

    if(cookies.get('token') == undefined)
    {
        throw redirect(302, "/login");
    }
    return {
        user: locals.user,
        peopleCooking: await getUsersCooking(),
        roster: await getRoster({week: 'thisWeek'}),
        nextWeeksRoster: await getRoster({week: 'nextWeek'})
    }
}


export const actions = {
    updateThisWeek: async (event: RequestEvent) => {

        const data = await event.request.formData();
        let newRoster: Array<Roster> = [];
        for(let i = 0; i < days.length; i++)
        {
            newRoster[i] = { day: days[i], person: data.get(days[i]) as string };
        }

        console.log(newRoster);
        roster.updateOne({_id: 'thisWeek'}, { 
            $set: {
                roster: newRoster
            }
        });
    },

    updateNextWeek: async (event: RequestEvent) => {

        const data = await event.request.formData();
        let newRoster: Array<Roster> = [];
        for(let i = 0; i < days.length; i++)
        {
            newRoster[i] = { day: days[i], person: data.get(days[i]) as string };
        }

        console.log(newRoster);
        roster.updateOne({_id: 'nextWeek'}, { 
            $set: {
                roster: newRoster
            }
        });
    },

    logout: async (event: RequestEvent) => {
        logoutUser(event);
    },

    updateUser: async (event: RequestEvent) => {

        const data = await event.request.formData();

        let isCooking = data.get("isCooking") ? true : false ;
        let isCookingNextWeek = data.get("isCookingNextWeek") ? true : false;

        if(event.locals.user)
        {
            // make a copy of the current user
            let cooking = event.locals.user.cooking;

            // update feilds
            cooking.isCooking = isCooking;
            cooking.isCookingNextWeek = isCookingNextWeek;

            users.updateOne({_id: event.locals.user._id}, {
                $set: {
                    cooking: cooking
                }
            })
        }
    }
}