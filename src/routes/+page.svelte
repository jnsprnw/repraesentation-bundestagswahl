<script lang="ts">
  import ElectionList from '$lib/components/ElectionList.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

<div class="flex w-full min-w-0 flex-col gap-y-6 px-2 md:w-4xl md:px-0">
  <header>
    <h1 class="mb-2 text-3xl font-bold">Repräsentation von Wahlen</h1>
    <p class="text-base text-balance">
      Wahlergebnisse repräsentieren nicht die tatsächliche Bevölkerung. Für jede Wahl wird gezeigt,
      wie sich die Stimmenanteile je nach verwendeter Gesamtmenge verändern. Inspiration und Daten
      von <a href="https://www.instagram.com/arne.semsrott/">Arne Semsrotts</a>
      <a href="https://www.youtube.com/watch?v=7waHkzEHcuw">Vortrag</a> bei der re:publica 26.
    </p>
  </header>
  <ElectionList elections={data.elections} />
</div>
