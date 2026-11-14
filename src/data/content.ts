import type { Guest } from "@/types/invitation";

const invitationMessages: Record<Guest["relationship"], string> = {
  senior:
    "I'd love for you to join me for a few photos and happy memories on my graduation day. Having you there would mean so much to me!",
  friend:
    "Come celebrate my graduation with me! Let's take a few photos and make some happy memories together.",
  junior:
    "I'd love to share my graduation day with you. Come join me for a few photos and a happy celebration!",
};

export function getInvitationMessage(guest: Readonly<Guest>): string {
  return guest.customMessage ?? invitationMessages[guest.relationship];
}

export const siteContent = {
  title: "HANH'S GRAD ERA",
  description: "A personal invitation to celebrate Dương Hải Hạnh's graduation.",
  rootGuidance: "Please open your personal invitation link to view your invitation.",
  notFoundTitle: "Invitation not found",
  notFoundMessage: "Please check your invitation link or ask Hải Hạnh to send it again.",
};

export const editorialContent = {
  intro: { brand: "SPECIAL DELIVERY", headline: ["A LETTER", "FOR", "YOU"], note: "A little celebration. A lot of heart.", open: "OPEN", accessibleOpen: "Open your invitation", postal: "PERSONAL DELIVERY" },
  cover: { edition: "The graduation issue", headline: "I DID IT!", class: "CLASS OF 2026", caption: "And I'd love to celebrate with you.", portrait: "A new chapter", portraitLabel: "Graduation portrait placeholder" },
  letter: { label: "A personal invitation", signoff: "With love,", signature: "Hải Hạnh" },
  event: { headline: "IT'S A DATE!"},
  accounting: { title: "GRADUATION BALANCE SHEET", assets: "Good memories", liabilities: "Deadlines", worth: "Priceless", stamp: "THE BOOKS ARE CLOSED" },
  location: { headline: "FIND ME THERE", where: "WHERE", assistance: "NEED A HAND?", hint: "Need help finding the venue? Give us a call.", action: "GET DIRECTIONS", call: "CALL", },
  wishes: {
    headline: "WILL YOU BE THERE?",
    hint: "Can you make it? Let me know below.",
    attendanceLabel: "Choose an RSVP",
    yes: "I'll be there!",
    no: "Sending love from afar",
    disclosure: "Leave me a little note?",
    placeholder: "Write me a little something...",
    label: "Your message",
    submit: "Send to Hạnh",
    sending: "SENDING...",
    success: "Delivered! Thanks for letting me know.",
    chooseAttendance: "Choose an option before sending.",
    unavailable: "Replies aren't available yet.",
    short: "A few more words, please.",
    long: "Your note is a little too long.",
    rateLimited: "Too many attempts. Please try again later.",
    failure: "Couldn't send your reply. Please try again.",
  },
  music: { off: "Music off", on: "Music on", play: "Play music", pause: "Pause music", blocked: "Playback blocked · retry", unavailable: "Audio unavailable" },
};
