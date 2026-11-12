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

export const editorialContent = {
  intro: { headline: ["A LETTER", "FOR", "YOU"], note: "A little celebration. A lot of heart.", open: "OPEN", accessibleOpen: "Open your invitation", postal: "PERSONAL DELIVERY" },
  cover: { edition: "The graduation issue", headline: "I DID IT!", class: "CLASS OF 2026", caption: "And I'd love to celebrate with you.", portrait: "A new chapter", portraitLabel: "Graduation portrait placeholder" },
  letter: { label: "A personal invitation", signoff: "With love,", signature: "Hạnh ♡" },
  event: { headline: "IT'S A DATE!", timezone: "Vietnam time · UTC+07:00" },
  accounting: { title: "GRADUATION BALANCE SHEET", assets: "Good memories", liabilities: "Deadlines", worth: "Priceless ♡", stamp: "THE BOOKS ARE CLOSED" },
  location: { headline: "THE DETAILS", where: "WHERE", assistance: "ON THE DAY", hint: "Need a hand finding me? Here's a familiar voice.", action: "DIRECTIONS", call: "CALL", fallback: "Map preview unavailable", fallbackHint: "Use the venue details below to plan your visit." },
  wishes: { headline: "GOT SOMETHING TO TELL ME?", hint: "Before you go, is there anything you'd like to say to me?", yes: "Of course! ♡", later: "Maybe later" },
  final: { headline: "NO GIFTS, JUST YOU!", note: "Having you there for a photo would mean so much to me. ♡", yes: "I'll be there!", no: "Sending love from afar!" },
  music: { off: "Music off", on: "Music on", play: "Play music", pause: "Pause music", blocked: "Playback blocked · retry", unavailable: "Audio unavailable" },
};
