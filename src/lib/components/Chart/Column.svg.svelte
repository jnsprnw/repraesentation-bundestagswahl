<!--
  @component
  Generates an SVG column chart.
 -->
<script>
  import { getContext } from 'svelte';
  import { getBundestagswahlState } from '$lib/state.svelte';
  const state = getBundestagswahlState();

  const { data, xGet, yGet, x, yRange, xScale, y, height, z, yScale } = getContext('LayerCake');

  /**
   * @typedef {Object} Props
   * @property {string} [stroke='#000'] - The shape's stroke color.
   * @property {number} [strokeWidth=0] - The shape's stroke width.
   * @property {boolean} [showLabels=false] - Show the numbers for each column
   * @property {(d: any) => string} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return.
   */

  /** @type {Props} */
  let { stroke = '#000', strokeWidth = 0, showLabels = false, format = (d) => d } = $props();

  let columnWidth = $derived((d) => {
    const vals = $xGet(d);
    return Math.abs(vals[1] - vals[0]);
  });

  let columnHeight = $derived((d) => {
    return $yRange[0] - $yGet(d);
  });

  const outlineHeight = $derived((d) => {
    return $yRange[0] - $yScale(d.relative);
  });
</script>

<g class="column-group">
  {#each $data as d, i (i)}
    {@const colHeight = columnHeight(d)}
    {@const xGot = $xGet(d)}
    {@const xPos = Array.isArray(xGot) ? xGot[0] : xGot}
    {@const colWidth = $xScale.bandwidth ? $xScale.bandwidth() : columnWidth(d)}
    {@const yValue = $y(d)}
    {#if state.step >= 2 && d.is_party}
      <rect
        class="group-rect"
        x={xPos + 0.5}
        y={$yScale(d.relative) + 0.5}
        width={colWidth - 1}
        height={outlineHeight(d) - 2}
        stroke={$z(d)}
        fill="rgba(255, 255, 255, 0.8)"
        stroke-dasharray="4 3"
      />
    {/if}
    <rect
      class="group-rect"
      data-id={i}
      data-range={$x(d)}
      data-count={yValue}
      x={xPos}
      y={$yGet(d)}
      width={colWidth}
      height={colHeight}
      fill={$z(d)}
      {stroke}
      stroke-width={strokeWidth}
    />

    {#if showLabels && yValue}
      <text
        class="text-xs font-semibold tabular-nums"
        x={xPos + colWidth / 2}
        y={$height - colHeight - 5}
        text-anchor="middle"
        stroke-width="3"
        fill="white"
        stroke="white"
      >
        {format(yValue)}
      </text>
      <text
        class="text-xs font-semibold tabular-nums"
        x={xPos + colWidth / 2}
        y={$height - colHeight - 5}
        text-anchor="middle"
      >
        {format(yValue)}
      </text>
    {/if}
  {/each}
</g>
