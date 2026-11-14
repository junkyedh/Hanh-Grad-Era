"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useInvitationCopy, useLanguage } from "./LanguageProvider";

export type GraduationWishFormProps = {
  guestSlug: string;
  guestDisplayName: string;
};

type Attendance = "attending" | "not_attending";
type FormStatus = "idle" | "sending" | "success" | "error" | "rate-limited";

const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() ?? "";
const validFormId = /^[a-zA-Z0-9]{6,32}$/.test(formId);

export default function GraduationWishForm({ guestSlug, guestDisplayName }: GraduationWishFormProps) {
  const copy = useInvitationCopy();
  const { language } = useLanguage();
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const submitLock = useRef(false);
  const firstChoiceRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const [showChoiceError, setShowChoiceError] = useState(false);
  const count = Array.from(draft.trim()).length;
  const invalidNote = count > 0 && count < 5 ? copy.wishes.short : count > 500 ? copy.wishes.long : "";
  const canSubmit = validFormId && status !== "sending";

  function setDraftValue(event: ChangeEvent<HTMLTextAreaElement>) {
    setDraft(event.target.value);
    if (status === "error" || status === "rate-limited") setStatus("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current || status === "success") return;
    if (!validFormId) return;
    if (!attendance) {
      setShowChoiceError(true);
      firstChoiceRef.current?.focus();
      return;
    }
    if (invalidNote) {
      if (!expanded) setExpanded(true);
      noteRef.current?.focus();
      return;
    }

    submitLock.current = true;
    setStatus("sending");

    const payload = new FormData();
    payload.set("guest_slug", guestSlug);
    payload.set("guest_display_name", guestDisplayName);
    payload.set("attendance", attendance);
    payload.set("message", draft.trim());

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      setStatus(response.ok ? "success" : response.status === 429 ? "rate-limited" : "error");
    } catch {
      setStatus("error");
    } finally {
      submitLock.current = false;
    }
  }

  const statusText = status === "sending" ? copy.wishes.sending
    : status === "success" ? copy.wishes.success
    : status === "error" ? copy.wishes.failure
    : status === "rate-limited" ? copy.wishes.rateLimited
    : !validFormId ? copy.wishes.unavailable
    : "";

  return (
    <section className="wishes-preview section-wrap" aria-labelledby="wishes-title" data-reveal>
      <h2 id="wishes-title" className={`display-heading ${language === "vi" ? "font-body" : "font-display"}`}>{copy.wishes.headline}</h2>
      <div className="wish-content">
        {status === "success" ? (
          <p className="wish-success" role="status" aria-live="polite">{copy.wishes.success}</p>
        ) : (
          <form className="wish-form" onSubmit={submit} noValidate>
            <p className="wish-helper">{copy.wishes.hint}</p>
            <fieldset className="attendance-options" aria-labelledby="attendance-legend">
              <legend id="attendance-legend" className="sr-only">{copy.wishes.attendanceLabel}</legend>
              <label data-choice="attending" className={`attendance-choice${attendance === "attending" ? " is-selected" : ""}`}>
                <input
                  type="radio"
                  ref={firstChoiceRef}
                  name="attendance"
                  value="attending"
                  required
                  checked={attendance === "attending"}
                  onChange={() => { setAttendance("attending"); setShowChoiceError(false); }}
                />
                <span className="attendance-indicator" aria-hidden="true" />
                <span className="attendance-text">{copy.wishes.yes}</span>
                <svg className="attendance-decor" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>
              </label>
              <label data-choice="not_attending" className={`attendance-choice${attendance === "not_attending" ? " is-selected" : ""}`}>
                <input
                  type="radio"
                  name="attendance"
                  value="not_attending"
                  required
                  checked={attendance === "not_attending"}
                  onChange={() => { setAttendance("not_attending"); setShowChoiceError(false); }}
                />
                <span className="attendance-indicator" aria-hidden="true" />
                <span className="attendance-text">{copy.wishes.no}</span>
                <svg className="attendance-decor" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 3 9 15M21 3l-7 18-4-8-8-4 19-6Z" /></svg>
              </label>
            </fieldset>
            {showChoiceError && <p className="choice-error" role="alert">{copy.wishes.chooseAttendance}</p>}

            <div className={`wish-disclosure${expanded ? " is-open" : ""}`}>
              <button
                type="button"
                className="wish-disclosure-button"
                aria-expanded={expanded}
                aria-controls="optional-note"
                onClick={() => setExpanded((current) => !current)}
              >
                <span className="wish-disclosure-copy"><strong>{copy.wishes.disclosure}</strong></span>
                <span className="note-toggle-mark" aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
            </div>
            {expanded && (
              <div id="optional-note" className="optional-note">
                <label className="sr-only" htmlFor="graduation-wish-message">{copy.wishes.label}</label>
                <textarea
                  ref={noteRef}
                  id="graduation-wish-message"
                  name="message"
                  value={draft}
                  onChange={setDraftValue}
                  placeholder={copy.wishes.placeholder}
                  aria-describedby="graduation-wish-count graduation-wish-validation"
                  aria-invalid={Boolean(invalidNote)}
                  disabled={status === "sending"}
                />
                <p id="graduation-wish-count" className="wish-counter" aria-live="polite">{count}/500</p>
                <p id="graduation-wish-validation" className="wish-validation" aria-live="polite">{invalidNote}</p>
              </div>
            )}

            {statusText && <p className="wish-status" role="status" aria-live="polite">{statusText}</p>}
            <button type="submit" className="reply-submit" disabled={!canSubmit}>
              <span className="reply-submit-label">{status === "sending" ? copy.wishes.sending : copy.wishes.submit}</span>
              {status === "sending" ? <span className="submit-spinner" aria-hidden="true" /> : (
                <svg className="reply-send-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                  <path d="M22 2 11 13" />
                </svg>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
