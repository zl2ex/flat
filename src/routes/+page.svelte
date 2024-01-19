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




<h1>Cooking</h1>

<form id="cooking"
    action="?/updateRoster"
    method="POST"
    use:enhance>
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
                        </select>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <button>submit</button>
</form>

