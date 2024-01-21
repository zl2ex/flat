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

<p></p>
<form id="cooking"
    action="?/updateRoster"
    method="POST"
    use:enhance={() => {
        return async ({ update }) => {
            update({ reset: false });
        };
    }}>
    <table>
        <thead>
            <tr>
            </tr>
        </thead>
        <tbody>
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
        </tbody>
    </table>
    <button>submit</button>
</form>



<style>
    td {
        padding: 0.1rem 0.5rem;
    }
</style>