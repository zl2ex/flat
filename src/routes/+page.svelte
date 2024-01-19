<script lang="ts">

    
    const { data } = $props();

    console.log(data);
</script>





<h1>Flat Roster</h1>


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
                    <select name={roster.day} value={roster.person}>
                        {#each data.peopleCooking as person}
                            <option value={person._id}>{person._id}</option>
                        {/each}               
                    </select>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

