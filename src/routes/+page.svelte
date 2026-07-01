<script lang="ts">
  import Table from '$lib/components/Table/Table.svelte';
  import Chart from '$lib/components/Chart/Chart.svelte';
  import { setBundestagswahlState, MAX_STEP } from '$lib/state.svelte';
  import { range } from 'd3-array';
  import Next from '$lib/icons/Next.svelte';
  import Previous from '$lib/icons/Previous.svelte';

  const state = setBundestagswahlState();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      state.previous_step();
    } else if (event.key === 'ArrowRight') {
      state.next_step();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="grid w-full grid-cols-1 gap-x-6 px-2 md:w-4xl md:grid-cols-[auto_1fr_auto] md:px-0">
  <nav class="hidden md:block">
    <button
      onclick={state.previous_step}
      disabled={state.step === 0}
      class="flex h-full w-30 items-center justify-center transition-colors enabled:text-blue-600 enabled:hover:bg-gray-200 disabled:opacity-20"
    >
      <Previous />
    </button>
  </nav>
  <div class="flex flex-col gap-y-12">
    <header>
      <h1 class="mb-2 text-3xl font-bold">Repräsentation der Bundestagswahl</h1>
      <p class="text-base text-balance">
        Die Ergebnisse der Bundestagswahl 2025 repräsentiert nicht die tatsächliche Bevölkerung.
        Hier wird gezeigt, wie sich die Stimmenanteile je nach verwendeter Gesamtmenge verändern.
        Inspiration und Daten von <a href="https://www.instagram.com/arne.semsrott/"
          >Arne Semsrotts</a
        >
        <a href="https://www.youtube.com/watch?v=7waHkzEHcuw">Vortrag</a> bei der re:publica 26. Basierend
        auf Ergebnissen der ersten Hochrechnung.
      </p>
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
