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
  intro: { eyebrow: "A little letter, a big milestone", note: "Something special, just for you.", open: "Open Invitation", music: "Music: Off", unavailable: "Music available soon" },
  cover: { edition: "The graduation issue", headline: "SHE DID IT!", class: "CLASS OF 2026", caption: "A new chapter looks good on her.", portrait: "Graduation portrait coming soon", portraitLabel: "Reserved for a portrait of Dương Hải Hạnh" },
  letter: { label: "A personal invitation", signoff: "With love,", signature: "Hạnh ♡" },
  event: { headline: "IT'S A DATE!", timezone: "Vietnam time · UTC+07:00", action: "Save the Date", unavailable: "Calendar download available soon" },
  accounting: { title: "GRADUATION BALANCE SHEET", assets: "Good memories", liabilities: "Deadlines", worth: "Priceless ♡", stamp: "THE BOOKS ARE CLOSED" },
  location: { headline: "DON'T GET LOST!", action: "Get Directions", unavailable: "Map and calling actions available soon", contacts: "A familiar voice, if you need one" },
  wishes: { headline: "GOT SOMETHING TO TELL ME?", hint: "Before you go, is there anything you'd like to say to me?", yes: "Of course! ♡", later: "Maybe later", unavailable: "Wish writing available soon" },
  final: { headline: "NO GIFTS, JUST YOU! ♡", note: "No gifts needed — having you there for a photo would mean so much to me! ♡", yes: "I'll be there!", no: "Sending love from afar!", unavailable: "RSVP messaging available soon", footer: "Made for a day worth remembering." },
};
