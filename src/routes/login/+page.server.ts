import jwt from 'jsonwebtoken';
import type { PageServerLoad, RequestEvent } from './$types';
import { PRIVATE_KEY, JWT_EXPERATION_TIME } from '$env/static/private';
import { users } from '$lib/mongodb/user';
import { redirect } from '@sveltejs/kit';


export async function load(event: RequestEvent) 
{
    console.log("/login/page.server.ts Load");
    const user = event.locals.user;

    console.log("user", user);
   
    if (user) {
      redirect(302, '/');
    }
};

export const actions = {
    login: async (event: RequestEvent) => {

        const data = await event.request.formData();
        const _id = data.get('_id') as string;

        if(!_id) return { sucsess: false, message: "No id provided" };
    

        const user = await users.findOne({_id: _id});

        console.log("user", user);

        if(!user) return { sucsess: false, message: "No User with that id found" };
    
    
        const token = jwt.sign({ _id: user._id }, PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: JWT_EXPERATION_TIME
        });

         // Set the cookie
        event.cookies.set('AuthorizationToken', `Bearer ${token}`, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 360 // 1 Year
        });
   
        redirect(302, '/');
    }
}
