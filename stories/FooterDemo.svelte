<script lang="ts">
  import Footer from "$lib/components/Footer/Footer.svelte"

  let { variant = "all" }: { variant?: "all" | "center" | "class" } = $props()
</script>

{#if variant === "center"}
  <Footer>
    {#snippet center()}
      <p>Copyright © 2024 Acme Inc.</p>
    {/snippet}
  </Footer>
{:else if variant === "class"}
  <Footer class="max-w-3xl mx-auto">
    {#snippet left()}
      <p>© 2026 Acme Inc.</p>
    {/snippet}
    {#snippet right()}
      <p>Privacy Policy · Terms of Service</p>
    {/snippet}
  </Footer>
{:else}
  <Footer>
    {#snippet left()}
      <p>© 2024 Acme Inc.</p>
    {/snippet}
    {#snippet center()}
      <p>Privacy Policy | Terms of Service</p>
    {/snippet}
    {#snippet right()}
      <p>Contact Us</p>
    {/snippet}
  </Footer>
{/if}
