<script>
  import { LayerCake, Svg } from 'layercake';
  import { scaleBand, scaleOrdinal } from 'd3-scale';
  import { formatPercentRound, formatPercent } from '$lib/format';
  import { getBundestagswahlState } from '$lib/state.svelte';

  const state = getBundestagswahlState();

  import Column from './Column.svg.svelte';
  import AxisX from './AxisX.svg.svelte';
  import AxisY from './AxisY.svg.svelte';

  const xKey = 'party';
  const yKey = 'actual';
  const zKey = 'color';
</script>

<div class="h-96 w-full">
  <LayerCake
    padding={{ top: 0, right: 20, bottom: 70, left: 30 }}
    x={xKey}
    y={yKey}
    z={zKey}
    xScale={scaleBand().paddingInner(0.15).paddingOuter(0.1).round(true)}
    zScale={scaleOrdinal()}
    yNice={true}
    xDomain={[
      ...state.parties_with_actual.map((d) => d.party),
      ...state.non_parties_with_actual.map((d) => d.party)
    ]}
    yDomain={[
      0,
      Math.max(
        ...state.parties.map((d) => d.relative),
        ...state.non_parties_with_actual.map((d) => d.actual)
      )
    ]}
    data={[
      ...state.parties_with_actual.filter((d) => d.is_include && d.is_display !== false),
      ...state.non_parties_with_actual.filter((d) => d.is_include)
    ]}
  >
    <Svg>
      <AxisX gridlines={false} />

      <AxisY snapBaselineLabel format={formatPercentRound} />
      <Column showLabels={true} format={formatPercent} />
    </Svg>
  </LayerCake>
</div>
