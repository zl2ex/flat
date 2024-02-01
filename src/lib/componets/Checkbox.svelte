
<script lang="ts">
    let { checked, label = '' } = $props<{checked: boolean, label?: string}>();
</script>

<div>
    <input type="checkbox" id="checkbox" class="toggle" bind:checked>
    <label for="checkbox">
        <div></div>
    </label>
    <span id="labelText">{label}</span>
</div>



<style>
    input[type="checkbox"].toggle {
    opacity: 0;
    position: absolute;
    left: -9000px;
    top: -9000px;
    }

    input[type="checkbox"].toggle + label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    }

    input[type="checkbox"].toggle + label::before {
    content: "";
    width: 2em;
    height: 1em;
    background-color: hsl(0, 80%, 90%);
    border-radius: 1em;
    margin-right: .25em;
    transition: background-color 200ms ease-in-out;
    }

    input[type="checkbox"].toggle + label::after {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    content: "\2715";
    font-size: .5em;
    height: .9em;
    left: .2em;
    width: 1.8em;
    height: 1.8em;
    background-color: hsl(0, 80%, 60%);
    color: white;
    border-radius: 1em;
    transition: background-color 200ms ease-in-out, transform 200ms ease-in-out;
    }

    input[type="checkbox"].toggle:focus-visible + label::before {
    outline: 1px solid black;
    }

    input[type="checkbox"].toggle:checked + label::before {
    background-color: hsl(100, 70%, 90%);
    }

    input[type="checkbox"].toggle:checked + label::after {
    content: "\2713";
    transform: translateX(100%);
    background-color: hsl(100, 70%, 60%);
    }

    input[type="checkbox"].toggle:disabled + label {
    color: #777;
    }

    input[type="checkbox"].toggle:disabled + label::before {
    background-color: #CCC;
    }

    input[type="checkbox"].toggle:disabled + label::after {
    background-color: #777;
    }
</style>