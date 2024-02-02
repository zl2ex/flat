import db from '$lib/mongodb/db';
import { users } from '$lib/mongodb/user';

export let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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


    
    let nextWeek = await roster.findOne({_id: 'nextWeek'});
    // check if we have a next week roster
    if(nextWeek)
    { 
        // shift the next week roster into the current weeks roster
        updateRoster({newRoster: nextWeek?.roster, week: 'thisWeek'});
    }
    else
    {
        console.error("no next week Roster found, creating one"); 
        updateRoster({newRoster: newRoster, week: 'nextWeek'});
    }

    // create a new roster for the next week
    updateRoster({newRoster: newRoster, week: 'nextWeek'});
}

export async function getRoster(props: { week: Week, generateNew?: boolean }): Promise<Array<Roster> | null>
{
    if(!props.generateNew) 
    {
        let currentRoster = await roster.findOne({_id: props.week});
        //console.log(currentRoster);
        // is there already a roster made ?
        if(currentRoster)
        {
            let now = new Date();
            // are we in the next week since the roster was made ?
            console.log(currentRoster.created.getWeek(), now.getWeek());
            if(currentRoster.created.getWeek() <= now.getWeek())
            //if(true)
            {
                console.log("already have roster");
                return currentRoster.roster;
            }
        }
    }
    
    console.log("no roster found, generating");
    await generateRosters();
    let updatedRoster = await roster.findOne({_id: props.week});
    return updatedRoster.roster;

}

export async function updateRoster(params: { newRoster: Array<Roster>, week: Week} )
{
    console.log("updateRoster()");
    // upsert: true - create if it doesnt exist
    roster.updateOne({ _id: params.week }, { 
        $set: {
            _id: params.week,
            created: new Date(),
            roster: params.newRoster
        } as DbRoster }, { 
            upsert: true 
    });
}   


export let roster = db.collection<DbRoster>('roster');

/*

*/