import { error } from '@sveltejs/kit';
import { getElections } from '$lib/server/elections';

export const prerender = true;

export async function entries() {
  const elections = await getElections();
  return elections.map(({ slug }) => ({ slug }));
}

export async function load({ params }) {
  const elections = await getElections();
  const election = elections.find((election) => election.slug === params.slug);

  if (!election) {
    error(404, 'Wahl nicht gefunden');
  }

  return { election };
}
