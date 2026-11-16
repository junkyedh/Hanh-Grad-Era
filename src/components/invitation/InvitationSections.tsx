'use client';

import { useInvitationCopy, useLanguage } from './LanguageProvider';
import { event } from '@/data/event';
import VenueMapPreview from './VenueMapPreview';
import Image from 'next/image';

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: event.timeZone,
});

function Accent({ kind }: { kind: 'calculator' | 'chart' }) {
  return (
    <svg
      className={`accounting-accent accent-${kind}`}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      aria-hidden="true"
    >
      {kind === 'calculator' ? (
        <>
          <rect x="17" y="7" width="46" height="66" rx="6" />
          <path d="M25 17h30v15H25zM26 43h5m9 0h5m9 0h1M26 54h5m9 0h5m9 0h1M26 65h5m9 0h5m9 0h1" />
        </>
      ) : (
        <>
          <path d="M10 9v60h61M20 59V43h10v16m10 0V30h10v29m10 0V16h10v43M16 31l19-15 15 5L69 5" />
        </>
      )}
    </svg>
  );
}

export function CoverSection({ general = false }: { general?: boolean }) {
  const copy = useInvitationCopy();
  const { language } = useLanguage();
  return (
    <section className="cover section-wrap" aria-labelledby="cover-title">
      <header className="edition-line">
        <span>{general ? copy.cover.edition : copy.intro.brand}</span>
      </header>
      <div className="cover-grid">
        <div className="cover-type">
          <h1 id="cover-title" className={language === 'en' ? 'font-display' : 'font-body'}>
            <span>{copy.cover.headline}</span>
          </h1>
          <p className="graduate-name">{event.graduate}</p>
          <p className="graduate-university">
            {language === 'vi'
              ? event.universityVi
              : general
                ? event.university.replace(' — ', ' - ')
                : event.university}
          </p>
        </div>
        <figure className="portrait-frame">
          <div className="portrait-placeholder">
            <Image
              src="/picture-graduation.jpg"
              alt="Dương Hải Hạnh - Graduation Portrait"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 480px"
              className="portrait-image"
            />
          </div>
          <figcaption className="eyebrow">{copy.cover.portrait}</figcaption>
          <span className="class-sticker eyebrow" aria-hidden="true">
            {copy.cover.class}
          </span>
        </figure>
      </div>
    </section>
  );
}

export function PersonalLetter({
  displayName,
  name,
  message,
  messageVi,
}: {
  displayName: string;
  name: string;
  message: string;
  messageVi: string;
}) {
  const copy = useInvitationCopy();
  const { language, addressing } = useLanguage();
  const greeting = language === 'vi' && addressing === 'ban' ? `${name} ơi,` : `${displayName},`;
  return (
    <section className="letter-section section-wrap" aria-labelledby="letter-title" data-reveal>
      <div className="letter-side">
        {copy.letter.label && <p className="eyebrow letter-eyebrow">{copy.letter.label}</p>}
        <p
          className={language === 'vi' ? 'letter-display font-body' : 'letter-display font-display'}
          aria-hidden="true"
        >
          <span>{copy.letter.displayStart}</span>
          <span>
            {language === 'vi' ? (
              <em>{copy.letter.displayEnd}</em>
            ) : (
              <>
                <em>{copy.letter.displayEnd}</em>
              </>
            )}
          </span>
        </p>
      </div>
      <div className="letter-card">
        <span className="letter-stamp font-display" aria-hidden="true">
          H
        </span>
        <h2 id="letter-title">{greeting}</h2>
        <p className="personal-message">{language === 'vi' ? messageVi : message}</p>
        {(copy.letter.signoff || copy.letter.signature) && (
          <p className="signature">
            {copy.letter.signoff && (
              <span className="signature-preface">{copy.letter.signoff}</span>
            )}
            {copy.letter.signature && <span>{copy.letter.signature}</span>}
          </p>
        )}
      </div>
    </section>
  );
}

export function GeneralLetter() {
  return (
    <section
      className="letter-section section-wrap"
      aria-labelledby="general-letter-title"
      data-reveal
    >
      <div className="letter-side">
        <p className="eyebrow letter-eyebrow">A LITTLE INVITATION</p>
        <p className="letter-display font-display" aria-hidden="true">
          <span>LET&apos;S</span>
          <span>CELEBRATE</span>
        </p>
      </div>
      <div className="letter-card">
        <span className="letter-stamp font-display" aria-hidden="true">
          H
        </span>
        <h2 id="general-letter-title">Come celebrate with me</h2>
        <p className="personal-message">
          I&apos;m graduating, and I&apos;d love to celebrate with you.
          <br />
          <br />
          If you&apos;re free, stop by for a few photos and a little catch-up.
        </p>
      </div>
    </section>
  );
}

export function EventDetails({ general = false }: { general?: boolean }) {
  const copy = useInvitationCopy();
  const { language } = useLanguage();
  const dateLabel = new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: event.timeZone,
  }).format(new Date(event.photoSession.startsAt));
  return (
    <section
      className="event-section section-wrap"
      aria-labelledby={copy.event.headline ? 'event-title' : undefined}
      aria-label={!copy.event.headline ? copy.event.kicker : undefined}
      data-reveal
    >
      <div>
        {copy.event.kicker && <p className="eyebrow event-kicker">{copy.event.kicker}</p>}
        {copy.event.headline && (
          <h2
            id="event-title"
            className={
              language === 'vi' ? 'display-heading font-body' : 'display-heading font-display'
            }
          >
            {copy.event.headline}
          </h2>
        )}
      </div>
      <div className="event-facts">
        <time dateTime={event.date} className="event-date">
          {dateLabel}
        </time>
        <p className="event-time font-display">
          {general
            ? '09:30–11:30'
            : `${timeFormat.format(new Date(event.photoSession.startsAt))}–${timeFormat.format(new Date(event.photoSession.endsAt))}`}
        </p>
      </div>
    </section>
  );
}

export function AccountingDecorations() {
  const copy = useInvitationCopy();
  return (
    <aside className="balance-strip section-wrap" aria-label={copy.accounting.title} data-reveal>
      <Accent kind="chart" />
      <div className="balance-copy">
        <h2 className="eyebrow">{copy.accounting.title}</h2>
        <dl>
          <div>
            <dt>{copy.accounting.assetsLabel}</dt>
            <dd>{copy.accounting.assets}</dd>
          </div>
          <div>
            <dt>{copy.accounting.liabilitiesLabel}</dt>
            <dd>
              <s>{copy.accounting.liabilities}</s>
            </dd>
          </div>
          <div>
            <dt>{copy.accounting.worthLabel}</dt>
            <dd>{copy.accounting.worth}</dd>
          </div>
        </dl>
      </div>
      <span className="books-stamp" aria-hidden="true">
        ✓<br />
        {copy.accounting.stamp}
      </span>
    </aside>
  );
}

export function LocationSection() {
  const copy = useInvitationCopy();
  const { language } = useLanguage();
  const helpContacts = event.contacts;
  const { latitude, longitude } = event.map;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${latitude},${longitude}`)}`;
  return (
    <section className="location-section section-wrap" aria-labelledby="location-title">
      <h2
        id="location-title"
        className={`display-heading ${language === 'vi' ? 'font-body' : 'font-display'}`}
        data-reveal
      >
        {copy.location.headline}
      </h2>
      <div className="location-grid">
        <div className="location-map" data-reveal="left">
          <h3 className={`location-subheading ${language === 'vi' ? 'font-body' : 'font-display'}`}>
            {copy.location.where}
          </h3>
          <VenueMapPreview
            embedUrl={event.map.embedUrl}
            directionsUrl={directionsUrl}
            venueName={event.venue}
            directionsLabel={copy.location.action}
          />
          <div className="venue-row">
            <div>
              <h4>{event.venue}</h4>
              <p>{event.building}</p>
            </div>
          </div>
        </div>
        <div className="location-help" data-reveal="right">
          <h3 className={`location-subheading ${language === "vi" ? "font-body" : "font-display"}`}>{copy.location.assistance}</h3>
          <div className="help-contact">
            {helpContacts.map((contact) => (
              <div className="help-contact-person" key={contact.tel}>
                <p className="contact-name">{contact.name}</p>
                <a
                  className="contact-action"
                  href={`tel:${contact.tel}`}
                  aria-label={`${copy.location.call} ${contact.name} — ${contact.phone}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72l.47 3a2 2 0 0 1-.57 1.7L8.1 11.3a16 16 0 0 0 4.6 4.6l1.88-1.88a2 2 0 0 1 1.7-.57l3 .47A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  <span>{contact.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
