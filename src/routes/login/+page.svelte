<script lang="ts">
    import { enhance } from '$app/forms';

    let { data } = $props();

</script>


<form use:enhance={() => {
        return async ({ update }) => {
            update({ reset: false });
        };
    }}
    method="POST"
    action="?/login">

    <h2>Login</h2>
    <div class="form-item">
        <label for="email">Name</label>
        <input name="_id" type="email"/>
    </div>
    <div class="form-item">
        <button class="primary" type="submit">Login</button>
    </div>
</form>


<style>

    form
    {
        display: flex;
        flex-direction: column;
        width: clamp(250px, 30%, 300px);
        gap: 1rem;
    }
    
    input
    {
        border-radius: 0.2rem;
    }

    .form-item
    {
        display: flex;
        flex-direction: column;
    }

    .form-action
    {
        display: flex;
        justify-content: space-between;
    }

</style>