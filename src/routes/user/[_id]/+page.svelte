<script lang="ts">
    import { enhance } from '$app/forms';
	import Checkbox from '$lib/componets/Checkbox.svelte';
    
    const { data } = $props();

</script>

<p></p>

{#if data.person}
    <form id="person"
        action="?/updatePerson"
        method="POST"
        use:enhance={() => {
            return async ({ update }) => {
                update({ reset: false });
            };
        }}>

        <h2>{data.person._id}</h2>

        <table>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cooking this week</td><td><Checkbox bind:checked={data.person.cooking.isCooking}></Checkbox></td>
                </tr>
                <tr>
                    <td>Cooking next week</td><td><Checkbox bind:checked={data.person.cooking.isCookingNextWeek}></Checkbox></td>
                </tr>
            </tbody>
        </table>
        <p></p>
        <button>save</button>

        

    </form>

    <table>
        <thead>
            <tr>
            </tr>
        </thead>
        <tbody>
            {#each data.person.cooking.stats as stat}
                <tr>
                    <td>{stat.day}</td>
                    <td>{stat.count}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    

{:else}

    <p>that person does not exist</p>
{/if}



<style>
    td {
        padding: 0.1rem 0.5rem;
    }
</style>