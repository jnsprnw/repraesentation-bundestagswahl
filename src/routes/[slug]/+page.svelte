<script lang="ts">
  import ElectionView from './ElectionView.svelte';
  import ElectionError from './ElectionError.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

{#key data.election.slug}
  {#if data.election.ok}
    <ElectionView election={data.election} elections={data.elections} />
  {:else}
    <ElectionError election={data.election} elections={data.elections} />
  {/if}
{/key}
