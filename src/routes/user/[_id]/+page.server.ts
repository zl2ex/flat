import { users } from "$lib/mongodb/user.js";
import type { RequestEvent } from "../$types.js";



export async function load({ params })
{
    return {
        person: await users.findOne({ _id: params._id })
    }
}


export const actions = {
    updatePerson: async (event: RequestEvent) => {

        const data = await event.request.formData();
        console.log(data);
    }
}