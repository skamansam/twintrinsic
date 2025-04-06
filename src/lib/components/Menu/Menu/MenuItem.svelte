<script>

  export let open = false;
  export let value = {};

  const toggleMenu = () => {
    open = !open;
  };
</script>

<li>
  { value.text }
  {#if value?.children}
    <ul>
      {#each value.children as child}
        <MenuItem {value:child}/>
      {/each}
    </ul>

  {/if}

</li>
