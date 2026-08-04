<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  type Props = {
    elections: { slug: string; title: string }[];
    current: string;
  };

  const { elections, current }: Props = $props();

  function handleChange(event: Event) {
    const slug = (event.target as HTMLSelectElement).value;
    if (slug !== current) goto(resolve('/[slug]', { slug }));
  }
</script>

<label class="flex items-center gap-x-2 text-sm">
  <span class="text-gray-500">Wahl</span>
  <select
    value={current}
    onchange={handleChange}
    class="rounded-sm border border-gray-300 bg-white px-2 py-1"
  >
    {#each elections as election (election.slug)}
      <option value={election.slug}>{election.title}</option>
    {/each}
  </select>
</label>
