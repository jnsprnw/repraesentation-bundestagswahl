<script lang="ts">
  import ElectionView from './ElectionView.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

{#key data.election.slug}
  <ElectionView election={data.election} elections={data.elections} />
{/key}
