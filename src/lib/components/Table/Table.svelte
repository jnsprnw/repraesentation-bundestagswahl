<script lang="ts">
  import { formatPercent, formatNumber } from '$lib/format';
  import { sumArray } from '$lib/math';
  import { getBundestagswahlState } from '$lib/state.svelte';
  import Row from './Row.svelte';
  import Label from './Label.svelte';

  const state = getBundestagswahlState();

  const hide_corrections = $derived(state.step < 2);
</script>

<table>
  <thead>
    <tr class="border-b border-b-gray-600 text-right text-sm/tight">
      <th class="pr-2 pb-2 text-left align-bottom">Partei</th>
      <th class="pb-2 pl-2">Ergebnis laut Wahlleiterin</th>
      <th class={['pb-2 pl-2 transition-colors', { hide: hide_corrections }]}>
        Tatsächlicher Anteil
      </th>
      <th class="pb-2 pl-2">Wähler:innen</th>
    </tr>
  </thead>
  <tbody class="text-base/none">
    {#each state.parties_with_actual as party, index (party.party)}
      {@const is_active = party.is_display !== false && party.is_include}
      <Row {is_active}>
        <Label
          color={party.color}
          {is_active}
          label={party.party}
          is_last={index === state.parties_with_actual.length - 1}
          is_first={index === 0}
        />
        <td class="text-sm">{formatPercent(party.relative)}</td>
        <td class={['font-semibold transition-colors', { hide: hide_corrections }]}>
          {formatPercent(party.actual)}
        </td>
        <td class="text-sm">{formatNumber(party.absolute)}</td>
      </Row>
    {/each}
    <tr
      class={[
        'border-t text-right text-sm/tight  text-gray-400 tabular-nums',
        state.include_non_voters
          ? 'border-t-gray-300'
          : 'border-t-transparent text-white select-none'
      ]}
    >
      <td class="non-party pt-2 text-left">Wahlberechtigte</td>
      <td>
        {formatPercent(
          (1 / state.current_absolute) *
            sumArray(state.parties_with_actual.map((party) => party.absolute))
        )}
      </td>
      <td></td>
      <td>{formatNumber(sumArray(state.parties_with_actual.map((party) => party.absolute)))}</td>
    </tr>
    {#each state.non_parties_with_actual as party, index (party.party)}
      <Row is_active={party.is_include}>
        <Label
          is_active={party.is_include}
          color={party.color}
          label={party.party}
          is_first={true}
          is_last={index === state.non_parties_with_actual.length - 1}
        />
        <td></td>
        <td class="font-semibold">{formatPercent(party.actual)}</td>
        <td class="text-sm">{formatNumber(party.absolute)}</td>
      </Row>
    {/each}
    <tr
      class={[
        'border-t text-right text-sm/tight  text-gray-400 tabular-nums',
        state.include_underage ? 'border-t-gray-300' : 'border-t-transparent text-white select-none'
      ]}
    >
      <td class="pt-2 text-left">Gesamtbevölkerung</td>
      <td></td>
      <td></td>
      <td>{formatNumber(state.current_absolute)}</td>
    </tr>
  </tbody>
</table>
