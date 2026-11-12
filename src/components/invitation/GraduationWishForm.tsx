"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { editorialContent as copy } from "@/data/content";

export type GraduationWishFormProps = {
  guestSlug: string;
  guestDisplayName: string;
};

type Attendance = "attending" | "not_attending";
type FormStatus = "idle" | "sending" | "success" | "error" | "rate-limited";

const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() ?? "";
const validFormId = /^[a-zA-Z0-9]{6,32}$/.test(formId);

export default function GraduationWishForm({ guestSlug, guestDisplayName }: GraduationWishFormProps) {
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const submitLock = useRef(false);
  const count = Array.from(draft.trim()).length;
  const invalidNote = count > 0 && count < 5 ? copy.wishes.short : count > 500 ? copy.wishes.long : "";
  const canSubmit = Boolean(attendance) && !invalidNote && validFormId && status !== "sending";

  function setDraftValue(event: ChangeEvent<HTMLTextAreaElement>) {
    setDraft(event.target.value);
    if (status === "error" || status === "rate-limited") setStatus("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current || status === "success") return;
    if (!attendance || invalidNote || !validFormId) return;

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
      <h2 id="wishes-title" className="display-heading font-display">{copy.wishes.headline}</h2>
      <div className="wish-content">
        {status === "success" ? (
          <p className="wish-success" role="status" aria-live="polite">{copy.wishes.success}</p>
        ) : (
          <form className="wish-form" onSubmit={submit} noValidate>
            <p className="wish-helper">{copy.wishes.hint}</p>
            <fieldset className="attendance-options" aria-labelledby="attendance-legend">
              <legend id="attendance-legend" className="sr-only">{copy.wishes.attendanceLabel}</legend>
              <label className={`attendance-choice${attendance === "attending" ? " is-selected" : ""}`}>
                <input
                  type="radio"
                  name="attendance"
                  value="attending"
                  required
                  checked={attendance === "attending"}
                  onChange={() => setAttendance("attending")}
                />
                <span className="attendance-indicator" aria-hidden="true" />
                <span>{copy.wishes.yes}</span>
              </label>
              <label className={`attendance-choice${attendance === "not_attending" ? " is-selected" : ""}`}>
                <input
                  type="radio"
                  name="attendance"
                  value="not_attending"
                  required
                  checked={attendance === "not_attending"}
                  onChange={() => setAttendance("not_attending")}
                />
                <span className="attendance-indicator" aria-hidden="true" />
                <span>{copy.wishes.no}</span>
              </label>
            </fieldset>

            <div className="wish-disclosure">
              <button
                type="button"
                className="wish-disclosure-button"
                aria-expanded={expanded}
                aria-controls="optional-note"
                onClick={() => setExpanded((current) => !current)}
              >{copy.wishes.disclosure}</button>
              <span className="optional-label">{copy.wishes.optional}</span>
            </div>
            {expanded && (
              <div id="optional-note" className="optional-note">
                <label className="sr-only" htmlFor="graduation-wish-message">{copy.wishes.label}</label>
                <textarea
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

            <button type="submit" className="seal-submit" disabled={!canSubmit}>
              <span>{status === "sending" ? copy.wishes.sending : copy.wishes.submit}</span>
              <span className={`seal-icon${status === "sending" ? " is-sending" : ""}`} aria-hidden="true">
                {status === "sending" ? <span className="submit-spinner" /> : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3.5" y="5.5" width="17" height="13" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                )}
              </span>
            </button>
            <p className="wish-status" role="status" aria-live="polite">{statusText || (!attendance ? copy.wishes.chooseAttendance : "")}</p>
          </form>
        )}
      </div>
    </section>
  );
}
