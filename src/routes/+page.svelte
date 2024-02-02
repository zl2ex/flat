<script lang="ts">
    import { enhance } from '$app/forms';
    import Checkbox from '$lib/componets/Checkbox.svelte';

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
        <h2>This Week</h2>
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
                                <select class="custom-select" name={roster.day} value={roster.person} on:input={submitForm}>
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
        <div class="form-item">
            <button type="submit" class="primary">save</button>
        </div>
    </form>


    <form id="cookingNextWeek"
        action="?/updateNextWeek"
        method="POST"
        use:enhance={() => {
            return async ({ update }) => {
                update({ reset: false });
            };
        }}>
        <h2>Next Week</h2>
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
                                <select class="custom-select" name={roster.day} value={roster.person} on:input={submitForm}>
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
        <div class="form-item">
            <button type="submit" class="primary">save</button>
        </div>
    </form>

    {#if data.user}
    <!--
        <form id="logout"
            action="?/logout"
            method="POST"
            use:enhance>
            
                <div class="form-item">
                    <h2>{data.user._id}</h2>
                    <button type="submit">Logout</button>
                </div>
        </form>
    -->

        <form id="user" 
            action="?/updateUser"
            method="POST"
            use:enhance>

                <div class="form-item">
                    <h2>{data.user._id}</h2>
                    
                </div>

                <div class="form-item">
                    <Checkbox name="isCookingNextWeek" label="Cooking next week" bind:checked={data.user.cooking.isCookingNextWeek}></Checkbox>
                    <Checkbox name="isCooking" label="cooking" bind:checked={data.user.cooking.isCooking}></Checkbox>
                </div>

                <div class="form-item">
                    <h3>days cooked</h3>
                    <table>
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.user.cooking.stats as stats}
                                <tr>
                                    <td>{stats.day}</td>
                                    <td>{stats.count}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="form-item">
                    <button type="submit" class="primary">save</button>
                </div>
            </form>

    {/if}

</div>



<style>

    #home 
    {
        display: flex;
        flex-direction: row;
        flex: 1;
        gap: 1rem;
        align-content: space-around;
        justify-content: center;
        flex-wrap: wrap;
    }

    @media only screen and (max-aspect-ratio: 0.7)
    {
        #home
        {
            flex-direction: column;    
        }

        form
        {
            width: 100%;
        }
    }


    td 
    {
        padding: 0.1rem 0.5rem;
        /*border-bottom: 0.1rem solid var(--app-color-neutral-500);*/
    }

    form 
    {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 0.1rem solid var(--app-color-neutral-500);
        border-radius: 0.5rem;
        padding: 1rem;
    }

    .form-item
    {
        display: flex;
        flex-direction: column;
    }

    h2,
    h3
    {
        margin: 0;
    }


</style>