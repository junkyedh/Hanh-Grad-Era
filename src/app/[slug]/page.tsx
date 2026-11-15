import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import InvitationPage from '@/components/invitation/InvitationPage';
import { getGuest, getGuestRouteParams } from '@/data/guests';

// Fully render known invitations so native disclosure works without JavaScript.
export function generateStaticParams() {
  return getGuestRouteParams();
}

type InvitationRouteProps = { params: Promise<{ slug: string }> };

async function ResolvedInvitation({ params }: InvitationRouteProps) {
  const { slug } = await params;
  const guest = getGuest(slug);
  if (!guest) notFound();
  return <InvitationPage guest={guest} />;
}

export default function Page({ params }: InvitationRouteProps) {
  return (
    <Suspense fallback={<p role="status">Loading your invitation...</p>}>
      <ResolvedInvitation params={params} />
    </Suspense>
  );
}
