import db from '$lib/mongodb/db';
import { users } from '$lib/mongodb/user';

export let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export type Roster = {
    day: string;
    person: string;
};

interface DbRoster extends Roster {
    created: Date;
    roster: Array<Roster>;
}

let skipDays = ['sat'];

var oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

export async function getRoster(): Promise<Array<Roster>>
{

    let currentRoster = await roster.find({}).toArray();
    // is there already a roster made ?
    if(currentRoster.length > 0)
    {
        // if less than 1 week has passed since the last roster was made
        if(currentRoster[0].created.getTime() +
            oneWeekInMilliseconds > Date.now())
        {
            console.log("already have roster");
            return currentRoster[0].roster;
        }
    }

    let flatMembers = await users.find({}).toArray();

    if(flatMembers.length <= 0) return [];

    flatMembers.sort((a, b) => a.cooking.lastCooked > b.cooking.lastCooked ? 1 : -1);

    // remove members who arent cooking
    for(let i = 0; i < flatMembers.length; i++)
    {
        if(flatMembers[i].cooking.isCooking == false)
        {
            flatMembers.splice(i, 1); // remove member
        }
    }

    let newRoster: Array<Roster> = [];
    let offset = 0;
    for(let j = 0; j < 7; j++)
    {
        let day = days[j];
        // if there are less members cooking than there are days in the week
        // re loop over and add them again
        if(j + offset >= flatMembers.length)
        {
            offset -= flatMembers.length;
        }

        // no person assigned on skips days
        if(skipDays.filter(str => str.includes(day)).length)
        {
            newRoster[j] = { day: day, person: "" };
            offset--;
        }
        else
        {
            newRoster[j] = { day: day, person: flatMembers[j + offset]._id };
        }
        
    }

    updateRoster(newRoster);
    return newRoster;
}

export async function updateRoster(newRoster: Array<Roster>)
{
    /*
    let currentRoster = await roster.find({}, { limit: 1 }).toArray();
    let haveRoster = currentRoster.length;
    console.log("haveRoster", haveRoster);
    // update existing roster
    if(haveRoster)
    {
        roster.updateOne({_id: currentRoster[0]._id }, { $set: {
            created: new Date(),
            roster: newRoster
        } as DbRoster });
    }

    // create new roster
    else
    {
        roster.insertOne({
            created: new Date(),
            roster: newRoster
        } as DbRoster);
    }
*/
    roster.updateOne({}, { $set: {
        created: new Date(),
        roster: newRoster
    } as DbRoster }, { upsert: true });
}   


export let roster = db.collection<DbRoster>('roster');

/*

*/