import { getInvitationMessage, siteContent } from "@/data/content";
import type { Guest } from "@/types/invitation";

export default function InvitationPage({ guest }: { guest: Readonly<Guest> }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">{siteContent.title}</h1>
      <p className="mt-8 text-xl">{guest.displayName}, ♡</p>
      <p className="mt-4 leading-relaxed">{getInvitationMessage(guest)}</p>
    </main>
  );
}
