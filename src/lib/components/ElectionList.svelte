<script lang="ts">
  import { resolve } from '$app/paths';

  type Props = {
    elections: { slug: string; title: string }[];
    current?: string;
  };

  const { elections, current }: Props = $props();
</script>

<nav aria-label="Alle Wahlen" class="flex flex-col gap-y-2">
  <span class="text-xs text-gray-500">Alle Wahlen</span>
  <ul class="flex flex-col gap-y-1">
    {#each elections as election (election.slug)}
      <li>
        {#if election.slug === current}
          <span class="font-semibold">{election.title}</span>
        {:else}
          <a href={resolve('/[slug]', { slug: election.slug })}>{election.title}</a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>
