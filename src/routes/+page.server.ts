import { connectToDatabase } from "$lib/mongodb/db";
//import { collections } from "$lib/mongodb/collections";
import { User, getUsersCooking, getUsersEating, users } from "$lib/mongodb/user.js";
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
    

    let now = new Date();
    return {
        user: locals.user,
        peopleCooking: await getUsersCooking(),
        usersEating: await getUsersEating(now.getDay()),
        roster: await getRoster({week: 'thisWeek'}),
        nextWeeksRoster: await getRoster({week: 'nextWeek'})
    }
}


export const actions = {
    updateThisWeek: async (event: RequestEvent) => {

        const data = await event.request.formData();
        let newRoster: Array<Roster> = [];
        let newEating: Array<{day: string, isEating: boolean}> = [];

        for(let i = 0; i < days.length; i++)
        {
            newRoster[i] = { day: days[i], person: data.get(days[i]) as string };
            newEating[i] = { day: days[i], isEating: data.get(`isEating_${days[i]}`) ? true : false}
        }

        roster.updateOne({_id: 'thisWeek'}, { 
            $set: {
                roster: newRoster
            }
        });

        if(event.locals.user)
        {
            event.locals.user.cooking.eating = newEating;

            users.updateOne({_id: event.locals.user._id}, {
                $set: {
                    cooking: event.locals.user.cooking
                }
            });
        }
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

        if(event.locals.user)
        {
            // update feilds
            event.locals.user.cooking.isCooking = isCooking;

            users.updateOne({_id: event.locals.user._id}, {
                $set: {
                    cooking: event.locals.user.cooking
                }
            })
        }
    }
}