import db from '$lib/mongodb/db';
import { getUsersCooking, users } from '$lib/mongodb/user';

export let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

let spoofTime = "2024-02-03";

export type Roster = {
    day: string;
    person: string;
};

type Week = 'thisWeek' | 'nextWeek';

interface DbRoster extends Roster {
    _id: Week;
    created: Date;
    roster: Array<Roster>;
}

let skipDays = ['sat'];


// adds getWeek of the year to Date
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};




async function generateRosters()
{
    // Stats
    let thisWeek = await roster.findOne({_id: 'thisWeek'});
    if(thisWeek)
    {
        for(let i = 0; i < thisWeek.roster.length; i++)
        {
            let user = await users.findOne({_id: thisWeek.roster[i].person});
            if(user)
            {
                let cooking = user.cooking;
                // incriment cooked count for that day
                cooking.stats[i].count++;

                let now = new Date();
                let lastCookedDate = new Date(now.getFullYear(), now.getMonth(), now.getDay() - 7 + i)
                
                console.log(days[i], user._id, cooking.stats[i].count, now, lastCookedDate);

                cooking.lastCooked = lastCookedDate;
                users.updateOne({_id: user._id}, {
                    $set: {
                        cooking: cooking
                    }
                });
            }
        }
    }

    //////////////////////////////////

    let flatMembers = await getUsersCooking();

    flatMembers.sort((a, b) => a.cooking.lastCooked > b.cooking.lastCooked ? 1 : -1);

    let newRoster: Array<Roster> = [];
    let offset = 0;
    for(let j = 0; j < days.length; j++)
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
    
    let nextWeek = await roster.findOne({_id: 'nextWeek'});
    // check if we have a next week roster
    if(nextWeek)
    { 
        // shift the next week roster into the current weeks roster
        await updateRoster({newRoster: nextWeek?.roster, week: 'thisWeek'});
    }
    else
    {
        console.error("no next week Roster found, creating one"); 
        await updateRoster({newRoster: newRoster, week: 'nextWeek'});
    }

    // create a new roster for the next week
    await updateRoster({newRoster: newRoster, week: 'nextWeek'});
}

export async function getRoster(props: { week: Week, generateNew?: boolean }): Promise<Array<Roster> | undefined>
{
    if(!props.generateNew) 
    {
        let currentRoster = await roster.findOne({_id: props.week});
        //console.log(currentRoster);
        // is there already a roster made ?
        if(currentRoster)
        {
            let now = new Date(spoofTime);
            // are we in the next week since the roster was made ?
            console.log(currentRoster.created.getWeek(), now.getWeek());
            if(currentRoster.created.getWeek() == now.getWeek())
            {
                console.log("already have roster");
                return currentRoster.roster;
            }
        }
    }
    
    console.log("roster out of date,  generating");
    await generateRosters();
    let updatedRoster = await roster.findOne({_id: props.week});
    return updatedRoster?.roster;

}

export async function updateRoster(params: { newRoster: Array<Roster>, week: Week} )
{
    console.log("updateRoster()");
    // upsert: true - create if it doesnt exist
    await roster.updateOne({ _id: params.week }, { 
        $set: {
            _id: params.week,
            created: new Date(spoofTime),
            roster: params.newRoster
        } as DbRoster }, { 
            upsert: true 
    });
}   


export let roster = db.collection<DbRoster>('roster');

/*

*/