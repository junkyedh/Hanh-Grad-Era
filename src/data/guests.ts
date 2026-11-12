import "server-only";

import type { Guest } from "@/types/invitation";

// Demo data only. Never commit real guest records to a public repository.
const guests: readonly Guest[] = [
  {
    slug: "demo-senior",
    name: "Phúc Linh",
    displayName: "Chị Phúc Linh",
    relationship: "senior",
  },
  {
    slug: "demo-friend",
    name: "Linh",
    displayName: "Linh",
    relationship: "friend",
    customMessage:
      "Let's celebrate this milestone with a few photos and happy memories. I'd love to have you there! ♡",
  },
  {
    slug: "demo-junior",
    name: "Hân",
    displayName: "Em Hân",
    relationship: "junior",
  },
];

export function getGuest(slug: string): Readonly<Guest> | undefined {
  return guests.find((guest) => guest.slug === slug);
}

// Server build input only; never publish these paths as a guest directory.
export function getGuestRouteParams(): { slug: string }[] {
  return guests.map(({ slug }) => ({ slug }));
}
