<script lang="ts">
  import Dot from './Dot.svelte';

  type Props = {
    color?: string;
    label: string;
    is_last?: boolean;
    is_first?: boolean;
    is_active?: boolean;
  };

  const { color, label, is_last, is_first, is_active }: Props = $props();
</script>

<td class={['flex items-center gap-x-2 py-1 text-left', { 'pb-3': is_last }, { 'pt-3': is_first }]}>
  {#if color}<Dot fill={is_active ? color : undefined} />
  {/if}<span>{label}</span>
</td>
