import { getElections } from '$lib/server/elections';

export async function load() {
  const elections = await getElections();
  return {
    elections: elections.map(({ slug, title }) => ({ slug, title }))
  };
}
