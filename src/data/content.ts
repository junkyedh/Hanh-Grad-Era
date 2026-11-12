import type { Guest } from "@/types/invitation";

const invitationMessages: Record<Guest["relationship"], string> = {
  senior:
    "I'd love for you to join me for a few photos and happy memories on my graduation day. Having you there would mean so much to me! ♡",
  friend:
    "Come celebrate my graduation with me! Let's take a few photos and make some happy memories together. ♡",
  junior:
    "I'd love to share my graduation day with you. Come join me for a few photos and a happy celebration! ♡",
};

export function getInvitationMessage(guest: Readonly<Guest>): string {
  return guest.customMessage ?? invitationMessages[guest.relationship];
}

export const siteContent = {
  title: "HANH'S GRAD ERA",
  description: "A personal invitation to celebrate Dương Hải Hạnh's graduation.",
  rootGuidance: "Please open your personal invitation link to view your invitation.",
  notFoundTitle: "Invitation not found",
  notFoundMessage: "Please check your invitation link or ask Hạnh to send it again.",
};
