<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();

  const tile = 'Repräsentation der Bundestagswahl';
  const url = 'https://repraesentation.prnw.dev/';
  const description =
    'Vergleich der Bundestagswahlergebnisse mit und ohne nicht-wahlberechtigen Gruppen';
</script>

<svelte:head>
  <title>{tile}</title>

  <meta name="robots" content="index noimageindex follow" />
  <meta name="description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="tile" />
  <meta property="og:description" content={description} />
  <meta property="article:published_time" content="2026-07-01T15:44:04+02:00" />
  <meta property="article:modified_time" content="2026-07-01T15:44:04+02:00" />
  <meta property="og:image" content="" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />

  <link rel="canonical" href={url} />

  <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen w-full flex-col items-center justify-center">
  {@render children()}
</div>
