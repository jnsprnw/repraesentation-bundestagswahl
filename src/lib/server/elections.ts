import { csvParse } from 'd3-dsv';
import { env } from '$env/dynamic/private';
import { slugify } from '$lib/slug';
import type { Election } from '$lib/types';

const PARTY_COLUMNS = ['Union', 'SPD', 'Grüne', 'Linke', 'AfD', 'Sonstige'];

function findValue(row: Record<string, string>, column: string): string {
  const key = Object.keys(row).find((k) => k.trim().toLowerCase() === column.toLowerCase());
  return key ? (row[key] ?? '').trim() : '';
}

function parsePercent(raw: string): number {
  const normalized = raw.replace('%', '').replace(',', '.').trim();
  const value = parseFloat(normalized);
  if (Number.isNaN(value)) throw new Error(`Ungültiger Prozentwert: "${raw}"`);
  return value > 1 ? value / 100 : value;
}

function parseAbsolute(raw: string): number {
  const digits = raw.replace(/[^0-9]/g, '');
  const value = parseInt(digits, 10);
  if (Number.isNaN(value)) throw new Error(`Ungültige Zahl: "${raw}"`);
  return value;
}

function parseDate(raw: string): Date | null {
  if (!raw) return null;

  const germanMatch = raw.match(
    /^(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
  );
  if (germanMatch) {
    const [, day, month, year, hour = '0', minute = '0', second = '0'] = germanMatch;
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    );
  }

  const isoLike = new Date(raw.replace(' ', 'T'));
  return Number.isNaN(isoLike.getTime()) ? null : isoLike;
}

function rowToElection(row: Record<string, string>): Election {
  const title = findValue(row, 'Titel');
  if (!title) throw new Error('Zeile im Sheet ohne Titel gefunden.');

  return {
    slug: slugify(title),
    title,
    wahlberechtigte_absolute: parseAbsolute(findValue(row, 'Wahlberechtigte')),
    waehlerinnen_relative: parsePercent(findValue(row, 'Wahlbeteiligung')),
    parties: PARTY_COLUMNS.map((name) => ({
      name,
      relative: parsePercent(findValue(row, name))
    })),
    non_citizen_absolute: parseAbsolute(findValue(row, 'Kein deutscher Pass')),
    minor_absolute: parseAbsolute(findValue(row, 'Minderjährige')),
    sources: {
      parties: findValue(row, 'Quelle Parteien'),
      non_voters: findValue(row, 'Quelle Nichtwähler'),
      non_citizens: findValue(row, 'Quelle Kein deutscher Pass'),
      minors: findValue(row, 'Quelle Minderjährige')
    },
    last_modified: parseDate(findValue(row, 'Zuletzt geändert'))
  };
}

async function fetchElections(): Promise<Election[]> {
  const sheetCsvUrl = env.SHEET_CSV_URL;
  if (!sheetCsvUrl) {
    throw new Error(
      'SHEET_CSV_URL ist nicht gesetzt. Bitte die URL des veröffentlichten Google-Sheet-CSVs als Umgebungsvariable hinterlegen.'
    );
  }

  const response = await fetch(sheetCsvUrl);
  if (!response.ok) {
    throw new Error(
      `Google Sheet konnte nicht geladen werden (${response.status} ${response.statusText}).`
    );
  }

  const csv = await response.text();
  const rows = csvParse(csv);
  if (rows.length === 0) {
    throw new Error('Das Google Sheet enthält keine Datenzeilen.');
  }

  return rows.map((row) => rowToElection(row as Record<string, string>));
}

let cache: Promise<Election[]> | null = null;

export function getElections(): Promise<Election[]> {
  if (!cache) cache = fetchElections();
  return cache;
}
