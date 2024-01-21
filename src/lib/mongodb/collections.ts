import { users } from "$lib/mongodb/user";
import { chores } from "$lib/mongodb/chore";


export const collections = {
	people: users,
	chores: chores
}