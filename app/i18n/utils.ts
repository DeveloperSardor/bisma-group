export function getLocalized(field: string | null | undefined, lang: string): string {
  if (!field) return "";
  try {
    const parsed = JSON.parse(field);
    if (typeof parsed === 'object' && parsed !== null && ('uz' in parsed || 'ru' in parsed || 'en' in parsed)) {
      return parsed[lang] || parsed['uz'] || parsed['ru'] || parsed['en'] || "";
    }
    return field; // Not a localized object
  } catch {
    return field; // Normal string
  }
}

// Server-side helper: pull the Uzbek (canonical) value out of a possibly-localized
// JSON string. Used for slug generation and "is empty?" validation in server actions.
export function uzOf(raw: string | null | undefined): string {
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && ("uz" in parsed || "ru" in parsed || "en" in parsed)) {
      return String(parsed.uz || parsed.ru || parsed.en || "").trim();
    }
  } catch {
    // not JSON — treat as plain string
  }
  return String(raw).trim();
}
