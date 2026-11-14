import { editorialContent as copy } from "@/data/content";
import { event } from "@/data/event";
import VenueMapPreview from "./VenueMapPreview";

const dateLabel = new Intl.DateTimeFormat("en-GB", {
  weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: event.timeZone,
}).format(new Date(event.photoSession.startsAt));
const timeFormat = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: event.timeZone });

function Accent({ kind }: { kind: "calculator" | "chart" }) {
  return (
    <svg className={`accounting-accent accent-${kind}`} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      {kind === "calculator" ? <><rect x="17" y="7" width="46" height="66" rx="6" /><path d="M25 17h30v15H25zM26 43h5m9 0h5m9 0h1M26 54h5m9 0h5m9 0h1M26 65h5m9 0h5m9 0h1" /></>
        : <><path d="M10 9v60h61M20 59V43h10v16m10 0V30h10v29m10 0V16h10v43M16 31l19-15 15 5L69 5" /></>}
    </svg>
  );
}

export function CoverSection() {
  return (
    <section className="cover section-wrap" aria-labelledby="cover-title">
      <header className="edition-line"><span>{copy.intro.brand}</span><span>{copy.cover.edition}</span></header>
      <div className="cover-grid">
        <div className="cover-type">
          <p className="eyebrow">{copy.cover.class}</p>
          <h1 id="cover-title" className="font-display"><span>{copy.cover.headline}</span></h1>
          <p className="graduate-name">{event.graduate}</p>
          <p className="graduate-university">{event.university}</p>
          <p className="cover-caption">{copy.cover.caption}</p>
          <Accent kind="calculator" />
        </div>
        <figure className="portrait-frame">
          <div className="portrait-placeholder" role="img" aria-label={copy.cover.portraitLabel}>
            <span className="portrait-orbit" aria-hidden="true" />
            <span className="portrait-monogram font-display" aria-hidden="true">GRAD<br />ERA.</span>
          </div>
          <figcaption className="eyebrow">{copy.cover.portrait} ↗</figcaption>
          <span className="class-sticker eyebrow" aria-hidden="true">{copy.cover.class}</span>
        </figure>
      </div>
    </section>
  );
}

export function PersonalLetter({ displayName, message }: { displayName: string; message: string }) {
  return (
    <section className="letter-section section-wrap" aria-labelledby="letter-title" data-reveal>
      <div className="letter-side">
        <p className="eyebrow letter-eyebrow">{copy.letter.label}</p>
        <p className="letter-display font-display" aria-hidden="true">
          <span>JUST</span>
          <span>FOR <em>YOU.</em></span>
        </p>
        <span className="letter-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="letter-card">
        <span className="letter-stamp font-display" aria-hidden="true">H.</span>
        <h2 id="letter-title">{displayName},</h2>
        <p className="personal-message">{message}</p>
        <p className="signature">{copy.letter.signoff} <span>{copy.letter.signature}</span></p>
      </div>
    </section>
  );
}

export function EventDetails() {
  return (
    <section className="event-section section-wrap" aria-labelledby="event-title" data-reveal>
      <h2 id="event-title" className="display-heading font-display">{copy.event.headline}</h2>
      <div className="event-facts">
        <time dateTime={event.date} className="event-date">{dateLabel}</time>
        <p className="event-time font-display">{timeFormat.format(new Date(event.photoSession.startsAt))}–{timeFormat.format(new Date(event.photoSession.endsAt))}</p>
      </div>
    </section>
  );
}

export function AccountingDecorations() {
  return (
    <aside className="balance-strip section-wrap" aria-label={copy.accounting.title} data-reveal>
      <Accent kind="chart" />
      <div className="balance-copy">
        <h2 className="eyebrow">{copy.accounting.title}</h2>
        <dl><div><dt>Assets</dt><dd>{copy.accounting.assets}</dd></div><div><dt>Liabilities</dt><dd><s>{copy.accounting.liabilities}</s></dd></div><div><dt>Net worth</dt><dd>{copy.accounting.worth}</dd></div></dl>
      </div>
      <span className="books-stamp" aria-hidden="true">✓<br />{copy.accounting.stamp}</span>
    </aside>
  );
}

export function LocationSection() {
  const helpContact = event.contacts[1];
  const { latitude, longitude } = event.map;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${latitude},${longitude}`)}`;

  return (
    <section className="location-section section-wrap" aria-labelledby="location-title">
      <h2 id="location-title" className="display-heading font-display" data-reveal>{copy.location.headline}</h2>
      <div className="location-grid">
        <div className="location-map" data-reveal="left">
          <h3 className="location-subheading font-display">{copy.location.where}</h3>
          <VenueMapPreview
            embedUrl={event.map.embedUrl}
            directionsUrl={directionsUrl}
            venueName={event.venue}
            directionsLabel={copy.location.action}
          />
          <div className="venue-row">
            <div><h4>{event.venue}</h4><p>{event.building}</p></div>
          </div>
        </div>
        <div className="location-help" data-reveal="right">
          <h3 className="location-subheading font-display">{copy.location.assistance}</h3>
          <p>{copy.location.hint}</p>
          <div className="help-contact">
            <p className="contact-name">{helpContact.name}</p>
            <a
              className="contact-action"
              href={`tel:${helpContact.tel}`}
              aria-label={`Call ${helpContact.name} at ${helpContact.phone}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72l.47 3a2 2 0 0 1-.57 1.7L8.1 11.3a16 16 0 0 0 4.6 4.6l1.88-1.88a2 2 0 0 1 1.7-.57l3 .47A2 2 0 0 1 22 16.92Z" />
              </svg>
              <span>{helpContact.phone}</span>
              <span className="contact-action-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
