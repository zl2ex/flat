import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { RequestEvent } from "../../routes/$types";
import { PRIVATE_KEY, JWT_EXPERATION_TIME, FLAT_PASSWORD } from '$env/static/private';
import { users } from '$lib/mongodb/user';
import { redirect } from '@sveltejs/kit';

export async function loginUser(event: RequestEvent)
{
    const data = await event.request.formData();
    const _id = data.get('id') as string;
    const password = data.get('password') as string;

    if(!_id) return { sucsess: false, message: "No id provided" };
    if(!password) return { sucsess: false, message: "No password provided" };

    const user = await users.findOne({_id: _id});

    if(!user || (password !== FLAT_PASSWORD)) return { sucsess: false, message: "Invalid Credentials" };
    
    const token = jwt.sign({ _id: user._id }, PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: JWT_EXPERATION_TIME
    });

        // Set the cookie
    event.cookies.set('token', `Bearer ${token}`, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 360 // 1 Year
    });

    redirect(302, '/');
}