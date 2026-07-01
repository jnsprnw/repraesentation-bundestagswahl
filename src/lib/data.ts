export const WAHLBERECHTIGTE_ABSOLUTE = 60510631;
export const WAEHLERINNEN_RELATIVE = 0.825;
export const WAEHLERINNEN_ABSOLUTE = WAHLBERECHTIGTE_ABSOLUTE * WAEHLERINNEN_RELATIVE;

// https://www.bundeswahlleiterin.de/bundestagswahlen/2025/ergebnisse/bund-99.html
// CDU + CSU
export const CDU_RELATIVE = 0.226 + 0.06;
export const SPD_RELATIVE = 0.164;
export const GRUNE_RELATIVE = 0.116;
export const LINKE_RELATIVE = 0.088;
export const AFD_RELATIVE = 0.208;
// FDP + SSW + Sonstige
export const SONSTIGE_RELATIVE = 0.043 + 0.02 + 0.094;

export const COLOR_CDU = 'rgb(51, 51, 51)';
export const COLOR_SPD = 'rgb(227, 29, 52)';
export const COLOR_GRUNE = 'rgb(91, 167, 0)';
export const COLOR_LINKE = 'rgb(193, 49, 151)';
export const COLOR_AFD = '#8B4513';
export const COLOR_SONSTIGE = 'oklch(0.75 0 0)';
export const COLOR_NON_VOTERS = 'oklch(0.65 0 0)';
export const COLOR_NON_CITIZEN = 'oklch(0.55 0 0)';
export const COLOR_MINOR = 'oklch(0.45 0 0)';

export const NON_CITIZEN_ABSOLUTE = 10250000;
export const MINOR_ABSOLUTE = 14300000;
