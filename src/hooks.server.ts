import { redirect, type Handle } from "@sveltejs/kit";
import { parse } from "cookie";
import jwt from 'jsonwebtoken';
import { users } from "$lib/mongodb/user";
import { PRIVATE_KEY } from "$env/static/private";


export const handle: Handle = async ({ event, resolve }) => {
    console.log("handleHook");
    const { headers, url } = event.request;

    console.log(url);

    const cookies = parse(headers.get("cookie") ?? "");
    let authVerified = false;

    if (cookies.token)
    {
        // Remove Bearer prefix
        const token = cookies.token.split(" ")[1];

        try
        {
            const jwtUser = jwt.verify(token, PRIVATE_KEY);
            if (typeof jwtUser === "string") 
            {
                throw new Error("Something went wrong");
            }

            console.log("jwtUser", jwtUser);

            const user = await users.findOne({_id: jwtUser._id });
    
            if (!user) throw new Error("User not found");
            const sessionUser = user._id;
            
            console.log('sessionUser', sessionUser);
            event.locals.user = sessionUser;

            authVerified = true;

        } 
        catch (error)
        {
            console.error(error);
        }
    }

    // only the login page is unprotected

    // WIP FIX !!!!!
    if(authVerified)// || url.includes('/login'))
    {
        return await resolve(event);
    }

    else
    {
        redirect(303, "/login");
    }
  };