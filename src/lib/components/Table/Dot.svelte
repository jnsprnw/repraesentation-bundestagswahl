<script lang="ts">
  type Props = {
    fill?: string | undefined;
  };

  const { fill }: Props = $props();
</script>

<svg class="h-2 w-2">
  <circle cx="50%" cy="50%" r="50%" fill={fill ?? 'white'} class="transition-colors" />
</svg>
