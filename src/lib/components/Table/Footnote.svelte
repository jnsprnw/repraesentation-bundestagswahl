<script lang="ts">
  type Props = {
    number: number;
  };

  const { number }: Props = $props();
</script>

<sup class="ml-0.5 text-[0.65em] font-normal text-gray-400">
  <a href="#quelle-{number}" class="no-underline">{number}</a>
</sup>
