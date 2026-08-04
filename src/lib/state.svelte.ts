import { getContext, setContext } from 'svelte';
import { Tween } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { SvelteMap } from 'svelte/reactivity';
import { PARTY_COLORS, COLOR_NON_VOTERS, COLOR_NON_CITIZEN, COLOR_MINOR } from '$lib/data';
import { sumArray } from '$lib/math';
import type { Election } from '$lib/types';

const TWEEN_OPTIONS = { duration: 450, easing: cubicOut };

type Party = {
  party: string;
  relative: number;
  absolute: number;
  color: string;
  is_display?: boolean;
  is_party?: boolean;
  is_include: boolean;
};

export const MAX_STEP = 4;

export class WahlState {
  #election!: Election;

  step = $state<number>(0);
  include_others = $derived<boolean>(this.step >= 1);
  include_non_voters = $derived<boolean>(this.step >= 2);
  include_non_citizens = $derived<boolean>(this.step >= 3);
  include_underage = $derived<boolean>(this.step >= MAX_STEP);

  #waehlerinnen_absolute = $derived(
    this.#election.wahlberechtigte_absolute * this.#election.waehlerinnen_relative
  );

  parties = $derived<Party[]>([
    ...this.#election.parties.map((party) => ({
      party: party.name,
      relative: party.relative,
      absolute: this.#waehlerinnen_absolute * party.relative,
      color: PARTY_COLORS[party.name],
      is_include: true,
      is_party: true,
      ...(party.name === 'Sonstige' ? { is_display: this.include_others } : {})
    })),
    {
      party: 'Nichtwähler:innen',
      relative: 1 - this.#election.waehlerinnen_relative,
      absolute:
        this.#election.wahlberechtigte_absolute * (1 - this.#election.waehlerinnen_relative),
      color: COLOR_NON_VOTERS,
      is_include: this.include_non_voters
    }
  ]);

  non_parties = $derived([
    {
      party: 'Kein deutscher Pass',
      absolute: this.#election.non_citizen_absolute,
      color: COLOR_NON_CITIZEN,
      is_include: this.include_non_citizens
    },
    {
      party: 'Minderjährige',
      absolute: this.#election.minor_absolute,
      color: COLOR_MINOR,
      is_include: this.include_underage
    }
  ]);

  current_absolute = $derived(
    sumArray(this.parties.filter((party) => party.is_include).map((party) => party.absolute)) +
      sumArray(this.non_parties.filter((party) => party.is_include).map((party) => party.absolute))
  );

  // Zielwerte des tatsächlichen Anteils – ohne Animation.
  #parties_actual = $derived(
    this.parties.map((party) => ({
      ...party,
      actual: (1 / this.current_absolute) * party.absolute
    }))
  );
  #non_parties_actual = $derived(
    this.non_parties.map((party) => ({
      ...party,
      actual: (1 / this.current_absolute) * party.absolute
    }))
  );

  // Ein Tween pro Partei, der den tatsächlichen Anteil weich animiert.
  // Start bei 0, damit die Balken beim ersten Laden von unten hochwachsen.
  #actual_tweens = new SvelteMap<string, Tween<number>>();

  constructor(election: Election) {
    this.#election = election;

    for (const { party } of [...this.#parties_actual, ...this.#non_parties_actual]) {
      this.#actual_tweens.set(party, new Tween(0, TWEEN_OPTIONS));
    }

    // Zielwerte reaktiv nachziehen – läuft initial (0 → Wert) und bei jeder Änderung.
    $effect(() => {
      for (const { party, actual } of [...this.#parties_actual, ...this.#non_parties_actual]) {
        const tween = this.#actual_tweens.get(party);
        if (tween) tween.target = actual;
      }
    });
  }

  parties_with_actual = $derived(
    this.#parties_actual.map((party) => ({
      ...party,
      actual: this.#actual_tweens.get(party.party)?.current ?? party.actual
    }))
  );
  non_parties_with_actual = $derived(
    this.#non_parties_actual.map((party) => ({
      ...party,
      actual: this.#actual_tweens.get(party.party)?.current ?? party.actual
    }))
  );

  next_step = () => {
    if (this.step < MAX_STEP) {
      this.step += 1;
    }
  };

  previous_step = () => {
    if (this.step > 0) {
      this.step -= 1;
    }
  };
}

const KEY_STATE = Symbol('state-bundestagswahl');

export function setWahlState(election: Election) {
  return setContext(KEY_STATE, new WahlState(election));
}

export function getWahlState() {
  return getContext<ReturnType<typeof setWahlState>>(KEY_STATE);
}
