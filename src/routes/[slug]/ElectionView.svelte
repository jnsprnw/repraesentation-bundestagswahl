<script lang="ts">
  import Table from '$lib/components/Table/Table.svelte';
  import Chart from '$lib/components/Chart/Chart.svelte';
  import ElectionSwitcher from '$lib/components/ElectionSwitcher.svelte';
  import ElectionList from '$lib/components/ElectionList.svelte';
  import { setWahlState, MAX_STEP } from '$lib/state.svelte';
  import { range } from 'd3-array';
  import { formatDate, formatUrl } from '$lib/format';
  import Next from '$lib/icons/Next.svelte';
  import Previous from '$lib/icons/Previous.svelte';
  import type { Election } from '$lib/types';

  type Props = {
    election: Election;
    elections: { slug: string; title: string }[];
  };

  const { election, elections }: Props = $props();

  // svelte-ignore state_referenced_locally
  const state = setWahlState(election);

  // Fortlaufende Nummerierung entspricht den Fußnoten-Verweisen in der Tabelle.
  const footnoteSources = $derived([
    { number: 1, label: 'Parteien und Nichtwähler:innen', url: election.sources.parties },
    { number: 2, label: 'Kein deutscher Pass', url: election.sources.non_citizens },
    { number: 3, label: 'Minderjährige', url: election.sources.minors }
  ]);

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      state.previous_step();
    } else if (event.key === 'ArrowRight') {
      state.next_step();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="grid w-full min-w-0 grid-cols-1 gap-x-6 px-2 md:w-4xl md:grid-cols-[auto_1fr_auto] md:px-0"
>
  <nav class="hidden md:block">
    <button
      onclick={state.previous_step}
      disabled={state.step === 0}
      class="flex h-full w-30 items-center justify-center transition-colors enabled:text-blue-600 enabled:hover:bg-gray-200 disabled:opacity-20"
    >
      <Previous />
    </button>
  </nav>
  <div class="flex min-w-0 flex-col gap-y-12">
    <header class="flex flex-col gap-y-4">
      <div>
        <h1 class="mb-2 text-3xl font-bold">{election.title}</h1>
        <p class="text-base text-balance">
          Die Ergebnisse der {election.title} repräsentieren nicht die tatsächliche Bevölkerung. Hier
          wird gezeigt, wie sich die Stimmenanteile je nach verwendeter Gesamtmenge verändern. Inspiration
          und Daten von <a href="https://www.instagram.com/arne.semsrott/">Arne Semsrotts</a>
          <a href="https://www.youtube.com/watch?v=7waHkzEHcuw">Vortrag</a> bei der re:publica 26.
        </p>
      </div>
      <ElectionSwitcher {elections} current={election.slug} />
    </header>
    <main class="flex flex-col gap-y-6">
      <Chart />
      <Table />
    </main>

    <aside class="flex flex-col items-start justify-start gap-y-2">
      <span class="text-xs">Ansicht</span>
      <div class="flex w-full items-center justify-center gap-x-2 rounded-sm bg-gray-100 px-1 py-1">
        {#each range(MAX_STEP + 1) as i (i)}
          <button
            onclick={() => (state.step = i)}
            aria-current={state.step === i}
            class="h-full w-full rounded-sm text-gray-400 hover:text-blue-500 aria-current:bg-blue-500 aria-current:font-semibold aria-current:text-white"
          >
            {i + 1}
          </button>
        {/each}
      </div>
    </aside>

    <section class="flex flex-col gap-y-1 text-xs text-gray-500">
      <span class="font-semibold">Quellen</span>
      <ul class="flex flex-col gap-y-0.5">
        {#each footnoteSources as source (source.number)}
          <li id="quelle-{source.number}" class="target:text-black">
            <span class="tabular-nums">{source.number}.</span>
            {source.label}:
            {#if source.url}
              <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- externe Quelle aus dem Sheet, keine interne Route -->
              <a href={source.url} class="break-words">{formatUrl(source.url)}</a>
            {:else}
              Keine Quelle angegeben
            {/if}
          </li>
        {/each}
      </ul>
      {#if election.last_modified}
        <span class="mt-6 block">
          Daten dieser Wahl eingetragen/zuletzt aktualisiert am <time
            datetime={election.last_modified.toISOString()}
          >
            {formatDate(election.last_modified)}
          </time>.
        </span>
      {/if}
    </section>

    <ElectionList {elections} current={election.slug} />
  </div>
  <nav class="hidden md:block">
    <button
      onclick={state.next_step}
      disabled={state.step === MAX_STEP}
      class="flex h-full w-30 items-center justify-center transition-colors enabled:text-blue-600 enabled:hover:bg-gray-200 disabled:opacity-20"
    >
      <Next />
    </button>
  </nav>
</div>
