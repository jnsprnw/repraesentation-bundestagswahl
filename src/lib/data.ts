import { sumArray } from '$lib/math';

export const WAHLBERECHTIGTE_ABSOLUTE = 59200000;
export const WAEHLERINNEN_RELATIVE = 0.84;
export const WAEHLERINNEN_ABSOLUTE = WAHLBERECHTIGTE_ABSOLUTE * WAEHLERINNEN_RELATIVE;

export const CDU_RELATIVE = 0.286;
export const SPD_RELATIVE = 0.163;
export const GRUNE_RELATIVE = 0.123;
export const LINKE_RELATIVE = 0.085;
export const AFD_RELATIVE = 0.204;
export const SONSTIGE_RELATIVE = 0.139;

export const CDU_COLOR = 'rgb(51, 51, 51)';
export const SPD_COLOR = 'rgb(227, 29, 52)';
export const GRUNE_COLOR = 'rgb(91, 167, 0)';
export const LINKE_COLOR = 'rgb(193, 49, 151)';
export const AFD_COLOR = '#8B4513';
export const SONSTIGE_COLOR = '#A6A6A6';

export const NON_CITIZEN_ABSOLUTE = 10250000;
export const MINOR_ABSOLUTE = 14300000;

export const parties = [
  {
    party: 'Union',
    relative: 0.286,
    absolute: WAEHLERINNEN_ABSOLUTE * 0.286,
    color: 'rgb(51, 51, 51)'
  },
  {
    party: 'SPD',
    relative: 0.163,
    absolute: WAEHLERINNEN_ABSOLUTE * 0.163,
    color: 'rgb(227, 29, 52)'
  },
  {
    party: 'Grüne',
    relative: 0.123,
    absolute: WAEHLERINNEN_ABSOLUTE * 0.123,
    color: 'rgb(91, 167, 0)'
  },
  {
    party: 'Linke',
    relative: 0.085,
    absolute: WAEHLERINNEN_ABSOLUTE * 0.085,
    color: 'rgb(193, 49, 151)'
  },
  {
    party: 'AfD',
    relative: 0.204,
    absolute: WAEHLERINNEN_ABSOLUTE * 0.204,
    color: '#8B4513'
  },
  {
    party: 'Sonstige',
    relative: 0.139,
    absolute: WAEHLERINNEN_ABSOLUTE * 0.139,
    color: '#A6A6A6'
  },
  {
    party: 'Nichtwähler:innen',
    relative: 1 - WAEHLERINNEN_RELATIVE,
    absolute: WAHLBERECHTIGTE_ABSOLUTE * (1 - WAEHLERINNEN_RELATIVE),
    color: '#A6A6A6'
    // in_sum: false
  }
];

export const nonParties = [
  {
    party: 'Kein deutscher Pass',
    absolute: 10250000,
    color: '#A6A6A6'
  },
  {
    party: 'Minderjährige',
    absolute: 14300000,
    color: '#A6A6A6'
  }
];

export const current_absolute =
  sumArray(parties.map((party) => party.absolute)) +
  sumArray(nonParties.map((party) => party.absolute));
