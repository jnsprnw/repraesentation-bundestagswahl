<script lang="ts">
  import ElectionSwitcher from '$lib/components/ElectionSwitcher.svelte';
  import ElectionList from '$lib/components/ElectionList.svelte';
  import type { InvalidElection } from '$lib/types';

  type Props = {
    election: InvalidElection;
    elections: { slug: string; title: string }[];
  };

  const { election, elections }: Props = $props();
</script>

<div class="flex w-full min-w-0 flex-col gap-y-12 px-2 md:w-4xl md:px-0">
  <header class="flex flex-col gap-y-4">
    <div>
      <h1 class="mb-2 text-3xl font-bold">{election.title}</h1>
      <p class="text-base text-balance">
        Für diese Wahl liegen im Google Sheet keine vollständigen oder gültigen Daten vor: <strong
          >{election.error}</strong
        >. Bitte die entsprechende Zeile im Sheet ergänzen bzw. korrigieren.
      </p>
    </div>
    <ElectionSwitcher {elections} current={election.slug} />
  </header>

  <ElectionList {elections} current={election.slug} />
</div>
