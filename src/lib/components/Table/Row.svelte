<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    is_active: boolean;
  };

  const { children, is_active = true }: Props = $props();
</script>

<tr class={['text-right tabular-nums transition-colors', is_active ? '' : 'hide']}>
  {@render children()}
</tr>
