<script lang="ts">
    import { enhance } from '$app/forms';

    const { data } = $props();

    

    function submitForm()
    {
        console.log("input");
        let form = document.querySelector("#cooking");
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Perform validation and processing here
        });

        //form.submit();
    }

</script>

<div id="home">

    <form id="cookingThisWeek"
        action="?/updateThisWeek"
        method="POST"
        use:enhance={() => {
            return async ({ update }) => {
                update({ reset: false });
            };
        }}>
        <p>This Week</p>
        <table>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {#if data.roster}
                    {#each data.roster as roster}
                        <tr>
                            <td>{roster.day}</td>
                            <td>
                                <select name={roster.day} value={roster.person} on:input={submitForm}>
                                    {#each data.peopleCooking as person}
                                        <option value={person._id}>{person._id}</option>
                                    {/each}             
                                    <option value=""></option>
                                </select>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
        <button>submit</button>
    </form>


    <form id="cookingNextWeek"
        action="?/updateNextWeek"
        method="POST"
        use:enhance={() => {
            return async ({ update }) => {
                update({ reset: false });
            };
        }}>
        <p>Next Week</p>
        <table>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {#if data.nextWeeksRoster}
                    {#each data.nextWeeksRoster as roster}
                        <tr>
                            <td>{roster.day}</td>
                            <td>
                                <select name={roster.day} value={roster.person} on:input={submitForm}>
                                    {#each data.peopleCooking as person}
                                        <option value={person._id}>{person._id}</option>
                                    {/each}             
                                    <option value=""></option>
                                </select>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
        <button>submit</button>
    </form>


    <form id="logout"
        action="?/logout"
        method="POST"
        use:enhance>
        <p>{data.user._id}</p>
        <button type="submit">Logout</button>
    </form>

</div>



<style>

    #home {
        display: flex;
        flex-direction: row;
        flex: 1;
        gap: 1rem;
        align-content: space-between;
        justify-content: center;
        flex-wrap: wrap;
    }

    @media only screen and (max-aspect-ratio: 0.7)
    {
        #home
        {
            flex-direction: column;
        }
    }


    td {
        padding: 0.1rem 0.5rem;
    }
</style>