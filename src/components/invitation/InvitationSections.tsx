import { editorialContent as copy } from "@/data/content";
import { event } from "@/data/event";

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
      <div className="letter-side" aria-hidden="true"><span>♡</span><p className="eyebrow">{copy.letter.label}</p></div>
      <div className="letter-card">
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
        <p>{event.photoSession.label}</p>
        <p className="small-copy">{copy.event.timezone}</p>
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
  const directionsQuery = encodeURIComponent(`${event.venue}, ${event.building}`);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${directionsQuery}`;
  return (
    <section className="location-section section-wrap" aria-labelledby="location-title">
      <h2 id="location-title" className="display-heading font-display" data-reveal>{copy.location.headline}</h2>
      <div className="location-grid">
        <div className="location-map" data-reveal="left">
          <h3 className="location-subheading font-display">{copy.location.where}</h3>
          <div className="map-fallback">
            <p>{copy.location.fallback}</p><span>{copy.location.fallbackHint}</span>
          </div>
          <div className="venue-row"><div><h4>{event.venue}</h4><p>{event.building}</p></div><a className="text-action directions-link" href={directionsUrl} target="_blank" rel="noopener noreferrer">{copy.location.action} <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="location-help" data-reveal="right">
          <h3 className="location-subheading font-display">{copy.location.assistance}</h3>
          <p>{copy.location.hint}</p>
          <div className="help-contact"><p>{helpContact.name}</p><a className="contact-number" href={`tel:${helpContact.tel}`}>{helpContact.phone}</a><a className="text-action call-link" href={`tel:${helpContact.tel}`}>{copy.location.call} <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
    </section>
  );
}

export function FinalNote() {
  return (
    <footer className="final-note section-wrap" data-reveal>
      <div><h2 className="display-heading font-display">{copy.final.headline}</h2><p className="final-copy">{copy.final.note}</p></div>
      <span className="closing-heart" aria-hidden="true">♡</span>
    </footer>
  );
}
