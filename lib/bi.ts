/** A bilingual string. Every piece of visible copy on the site carries both languages. */
export interface Bi {
  readonly en: string;
  readonly ar: string;
}

export const bi = (en: string, ar: string): Bi => ({ en, ar });
