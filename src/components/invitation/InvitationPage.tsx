import { getInvitationMessage } from "@/data/content";
import type { Guest } from "@/types/invitation";
import InvitationExperience from "./InvitationExperience";
import { AccountingDecorations, CoverSection, EventDetails, FinalNote, LocationSection, PersonalLetter, WishesPreview } from "./InvitationSections";

export default function InvitationPage({ guest }: { guest: Readonly<Guest> }) {
  return (
    <InvitationExperience displayName={guest.displayName}>
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
