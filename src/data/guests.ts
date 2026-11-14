import "server-only";

import type { Guest } from "@/types/invitation";

const demoGuests: readonly Guest[] = [
  { slug: "demo-senior", name: "Phúc Linh", displayName: "Chị Phúc Linh", relationship: "senior", addressing: "chi" },
  { slug: "demo-friend", name: "Linh", displayName: "Linh", relationship: "friend", addressing: "ban", customMessage: "Let's celebrate this milestone with a few photos and happy memories. I'd love to have you there! ♡" },
  { slug: "demo-junior", name: "Hân", displayName: "Em Hân", relationship: "junior", addressing: "em" },
];

function getPrivateGuests(): readonly Guest[] {
  const json = process.env.PRIVATE_GUESTS_JSON;
  if (!json) return [];
  let parsed: unknown;
  try { parsed = JSON.parse(json); }
  catch { throw new Error("PRIVATE_GUESTS_JSON must be valid JSON"); }
  if (!Array.isArray(parsed)) throw new Error("PRIVATE_GUESTS_JSON must contain an array");
  const validAddressing = new Set(["co", "anh", "chi", "be", "em", "ban"]);
  const validRelationship = new Set(["senior", "friend", "junior"]);
  return parsed.map((raw: unknown, index: number) => {
    if (typeof raw !== "object" || raw === null) throw new Error(`Invalid guest at index ${index}`);
    const guest = raw as Record<string, unknown>;
    if (typeof guest.slug !== "string" || !/^[a-zA-Z0-9_-]{4,64}$/.test(guest.slug) ||
        typeof guest.name !== "string" || typeof guest.displayName !== "string" ||
        !validAddressing.has(guest.addressing as string) || !validRelationship.has(guest.relationship as string)) {
      throw new Error(`Invalid PRIVATE_GUESTS_JSON guest at index ${index}`);
    }
    if (guest.customMessage !== undefined && typeof guest.customMessage !== "string") throw new Error(`Invalid English message at index ${index}`);
    if (guest.customMessageVi !== undefined && typeof guest.customMessageVi !== "string") throw new Error(`Invalid Vietnamese message at index ${index}`);
    return {
      slug: guest.slug as string,
      name: guest.name as string,
      displayName: guest.displayName as string,
      relationship: guest.relationship as Guest["relationship"],
      addressing: guest.addressing as NonNullable<Guest["addressing"]>,
      customMessage: guest.customMessage as string | undefined,
      customMessageVi: guest.customMessageVi as string | undefined,
    };
  });
}

const guests: readonly Guest[] = [...demoGuests, ...getPrivateGuests()];
const slugs = guests.map((guest) => guest.slug);
if (new Set(slugs).size !== slugs.length) throw new Error("Duplicate guest slugs");

export function getGuest(slug: string): Readonly<Guest> | undefined {
  return guests.find((guest) => guest.slug === slug);
}

export function getGuestRouteParams(): { slug: string }[] {
  return guests.map(({ slug }) => ({ slug }));
}
