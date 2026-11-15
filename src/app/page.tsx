import { existsSync } from 'node:fs';
import path from 'node:path';
import InvitationExperience from '@/components/invitation/InvitationExperience';
import {
  AccountingDecorations,
  CoverSection,
  EventDetails,
  GeneralLetter,
  LocationSection,
} from '@/components/invitation/InvitationSections';

export default function Home() {
  return (
    <InvitationExperience
      hasAudio={existsSync(path.join(process.cwd(), 'public/audio/grad-theme.mp3'))}
      general
    >
      <CoverSection general />
      <GeneralLetter />
      <EventDetails general />
      <AccountingDecorations />
      <LocationSection />
      <section className="general-closing section-wrap" aria-label="Invitation closing" data-reveal>
        <h2 className="font-display">Hope to see you there</h2>
      </section>
    </InvitationExperience>
  );
}
