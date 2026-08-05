export type ElectionSources = {
  parties: string;
  non_citizens: string;
  minors: string;
};

export type ElectionParty = {
  name: string;
  relative: number;
};

export type Election = {
  ok: true;
  slug: string;
  title: string;
  wahlberechtigte_absolute: number;
  waehlerinnen_relative: number;
  parties: ElectionParty[];
  non_citizen_absolute: number;
  minor_absolute: number;
  sources: ElectionSources;
  last_modified: Date | null;
};

export type InvalidElection = {
  ok: false;
  slug: string;
  title: string;
  error: string;
};

export type ElectionEntry = Election | InvalidElection;
