import { editorialContent as copy, siteContent } from "@/data/content";
import { event } from "@/data/event";

const dateLabel = new Intl.DateTimeFormat("en-GB", {
  weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: event.timeZone,
}).format(new Date(event.photoSession.startsAt));
const timeFormat = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: event.timeZone });

function Accent({ kind }: { kind: "calculator" | "chart" | "coins" }) {
  return <svg className={`accounting-accent accent-${kind}`} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    {kind === "calculator" ? <><rect x="17" y="7" width="46" height="66" rx="6" /><path d="M25 17h30v15H25zM26 43h5m9 0h5m9 0h1M26 54h5m9 0h5m9 0h1M26 65h5m9 0h5m9 0h1" /></> : kind === "chart" ? <><path d="M10 9v60h61M20 59V43h10v16m10 0V30h10v29m10 0V16h10v43M16 31l19-15 15 5L69 5" /></> : <><ellipse cx="32" cy="48" rx="23" ry="10" /><path d="M9 48v12c0 13 46 13 46 0V48M9 54c0 13 46 13 46 0" /><circle cx="49" cy="27" r="20" /><path d="M49 14v26m7-21c-15-8-19 12-6 9s13 16-7 8" /></>}
  </svg>;
}

export function CoverSection() {
  return <section className="cover section-wrap" aria-labelledby="cover-title">
    <header className="edition-line"><span>{siteContent.title}</span><span>{copy.cover.edition} / 2026</span></header>
    <div className="cover-grid">
      <div className="cover-type"><p className="eyebrow">{copy.cover.class}</p><h1 id="cover-title">SHE<br />DID IT<span className="cherry">!</span></h1><p className="graduate-name">{event.graduate}</p><p className="cover-caption">{copy.cover.caption}</p><Accent kind="calculator" /></div>
      <figure className="portrait-frame"><div className="portrait-placeholder" role="img" aria-label={copy.cover.portraitLabel}><span className="portrait-orbit" aria-hidden="true" /><span className="portrait-monogram" aria-hidden="true">H.</span><span className="portrait-caption">{copy.cover.portrait}</span></div><figcaption><span>THE NEXT CHAPTER</span><span>01 / 26</span></figcaption><span className="class-sticker" aria-hidden="true">CLASS OF<br /><strong>2026</strong></span></figure>
    </div>
    <div className="cover-bottom"><span>28 NOVEMBER 2026</span><span aria-hidden="true">A little celebration. A lot of heart. ↘</span></div>
  </section>;
}

export function PersonalLetter({ displayName, message }: { displayName: string; message: string }) {
  return <section className="letter-section section-wrap" aria-labelledby="letter-title"><p className="eyebrow section-index">01 / {copy.letter.label}</p><div className="letter-card"><span className="letter-corner" aria-hidden="true">♡</span><h2 id="letter-title">{displayName}, ♡</h2><p className="personal-message">{message}</p><p className="signature"><span>{copy.letter.signoff}</span>{copy.letter.signature}</p></div></section>;
}

export function EventDetails() {
  return <section className="event-section section-wrap" aria-labelledby="event-title"><p className="eyebrow">02 / Mark your calendar</p><div className="event-grid"><h2 id="event-title" className="display-heading">{copy.event.headline}</h2><div className="event-facts"><time dateTime={event.date} className="event-date">{dateLabel}</time><p className="event-time">{timeFormat.format(new Date(event.photoSession.startsAt))}–{timeFormat.format(new Date(event.photoSession.endsAt))}</p><p>{event.photoSession.label}</p><p className="small-copy">{copy.event.timezone}</p><button className="button button-outline" disabled aria-describedby="calendar-unavailable">{copy.event.action} <span aria-hidden="true">↗</span></button><p id="calendar-unavailable" className="availability">{copy.event.unavailable}</p></div></div></section>;
}

export function AccountingDecorations() {
  return <aside className="balance-strip section-wrap" aria-label={copy.accounting.title}><Accent kind="chart" /><div className="balance-copy"><h2 className="eyebrow">{copy.accounting.title}</h2><dl><div><dt>Assets</dt><dd>{copy.accounting.assets}</dd></div><div><dt>Liabilities</dt><dd><s>{copy.accounting.liabilities}</s></dd></div><div><dt>Net worth</dt><dd>{copy.accounting.worth}</dd></div></dl></div><span className="books-stamp" aria-hidden="true">✓<br />{copy.accounting.stamp}</span></aside>;
}

export function LocationSection() {
  return <section className="location-section section-wrap" aria-labelledby="location-title"><p className="eyebrow">03 / See you here</p><div className="location-grid"><div><h2 id="location-title" className="display-heading">{copy.location.headline}</h2><Accent kind="coins" /></div><div className="location-card"><span className="location-mark" aria-hidden="true">↗</span><h3>{event.venue}</h3><p>{event.building}</p><button className="button" disabled aria-describedby="location-unavailable">{copy.location.action} <span aria-hidden="true">↗</span></button><p className="eyebrow contact-heading">{copy.location.contacts}</p><ul className="contact-list">{event.contacts.map(contact => <li key={contact.tel}><span>{contact.name}</span><span>{contact.phone}</span></li>)}</ul><p className="availability" id="location-unavailable">{copy.location.unavailable}</p></div></div></section>;
}

export function WishesPreview() {
  return <section className="wishes-preview section-wrap" aria-labelledby="wishes-title"><span className="wish-heart" aria-hidden="true">♡</span><p className="eyebrow">04 / A little keepsake</p><h2 id="wishes-title" className="display-heading">{copy.wishes.headline}</h2><p>{copy.wishes.hint}</p><div className="action-row"><button className="button" disabled aria-describedby="wishes-unavailable">{copy.wishes.yes}</button><button className="button button-outline" disabled aria-describedby="wishes-unavailable">{copy.wishes.later}</button></div><p className="availability" id="wishes-unavailable">{copy.wishes.unavailable}</p></section>;
}

export function FinalNote() {
  return <footer className="final-note section-wrap"><p className="eyebrow">The best part is having you here</p><h2 className="display-heading">{copy.final.headline}</h2><p className="final-copy">{copy.final.note}</p><div className="action-row"><button className="button" disabled aria-describedby="rsvp-unavailable">{copy.final.yes}</button><button className="button button-outline" disabled aria-describedby="rsvp-unavailable">{copy.final.no}</button></div><p className="availability" id="rsvp-unavailable">{copy.final.unavailable}</p><div className="footer-line"><span>{siteContent.title}</span><span>{copy.final.footer}</span><span>♡ HẠNH</span></div></footer>;
}
