import { getInvitationMessage } from "@/data/content";
import { existsSync } from "node:fs";
import path from "node:path";
import { event } from "@/data/event";
import type { Guest } from "@/types/invitation";
import InvitationExperience from "./InvitationExperience";
import { AccountingDecorations, CoverSection, EventDetails, FinalNote, LocationSection, PersonalLetter, WishesPreview } from "./InvitationSections";

export default function InvitationPage({ guest }: { guest: Readonly<Guest> }) {
  return (
    <InvitationExperience
      displayName={guest.displayName}
      dateStamp={new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: event.timeZone }).format(new Date(event.photoSession.startsAt))}
      hasAudio={existsSync(path.join(process.cwd(), "public/audio/grad-theme.mp3"))}
    >
      <CoverSection />
      <PersonalLetter displayName={guest.displayName} message={getInvitationMessage(guest)} />
      <EventDetails />
      <AccountingDecorations />
      <LocationSection />
      <WishesPreview />
      <FinalNote />
    </InvitationExperience>
  );
}
