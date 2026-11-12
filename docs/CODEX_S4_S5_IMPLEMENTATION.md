# Codex Implementation Handoff — Stages S4 + S5

**Project:** Personalized Graduation Invitation  
**Purpose:** Implement the interactive graduation-wish section and Formspree delivery on top of the **existing, working S1 + S2 + S2R + S3 code**.  
**Canonical project spec:** `docs/PROJECT_SPEC.md` (v1.4.1 or the current approved replacement).  
**Status at handoff:** S1, S2, S2R and S3 reported complete. **S4 and S5 are not implemented.**  
**Mode:** IMPLEMENT, not PLAN_ONLY. **No commit, push, deploy, or unrelated refactor.**

> This document is a self-contained, detailed prompt for a smaller Codex model. Put it in `docs/CODEX_S4_S5_IMPLEMENTATION.md` if desired, then paste the short execution command from the end. It supplements rather than replaces `docs/PROJECT_SPEC.md`.

---

## 0. Mandatory working rules

1. **Start by running `git status --short`, `git diff --stat`, and `git diff --cached --stat`.** Identify staged and unstaged work. Preserve all existing work; **never reset, checkout, clean, force-add, or restage unrelated files**.
2. Inspect only the relevant existing files before editing:
   - `docs/PROJECT_SPEC.md` — especially §3 (language), §9 (wishes), §11 (accessibility), §12 (stages).
   - `src/components/invitation/InvitationPage.tsx`
   - `src/components/invitation/InvitationSections.tsx`
   - `src/components/invitation/InvitationExperience.tsx` **only if necessary**
   - `src/data/content.ts`, `src/data/guests.ts`, `src/types/invitation.ts`
   - `src/app/globals.css`, `package.json`
3. **Reuse existing components, props, CSS tokens, font classes, and editorial visual design.** The current intro, cover, dark details section, animations, music, responsive behavior and guest resolution are approved. Do not redesign them.
4. Do not initialize a new Next.js project, alter Git configuration, or update unrelated dependencies.
5. **No Supabase, Prisma, SQL, Firebase, separate backend, `app/api/wishes/route.ts`, authentication, new admin page, or RSVP/calendar work.**
6. **No dependency is needed for S4/S5:** use native React, `fetch`, `FormData`, and the browser APIs. Do **not** install `@formspree/react`, Axios or form libraries for this small form.
7. Keep all UI text **English**, except for **exactly configured Vietnamese proper names and honorifics**. Do not infer or modify honorifics.
8. Never invent or hardcode real recipient email addresses, names, contact numbers, event details, locations, or provider form IDs.
9. Do not do another reference-site audit. Do not attempt screenshots or external searches unless an implementation-specific issue makes them necessary.
10. Do not claim a real Formspree submission was tested unless an actual form ID was configured and a real submission confirmed in its dashboard.

## 1. Exact product behavior

The guest is already resolved from `/<slug>` on the server. The guest does **not** need to identify themselves again.

**Initial wish section** (collapsed):

- Main headline: `GOT SOMETHING TO TELL ME?`
- Supporting text: `Before you go, is there anything you'd like to say to me?`
- Two understated controls: `Of course! ♡` and `Maybe later`.
- Show **no textarea**, sender input, email input, or other form until affirmative action.
- When the section enters the viewport, use **only the existing** scroll-reveal styles; **do not expand it automatically**.
- Clicking `Of course! ♡` reveals **one textarea**, a character counter and `Send My Wish ♡`.
- Clicking `Maybe later` skips/collapses the form and permits normal scrolling; it does not submit a request. Preserve an existing unfinished draft if the user reopens the form.
- The guest's display name may be shown discreetly **once**, but **never as an editable input**; it is optional if it adds visual clutter.
- Existing RSVP is a separate feature to be implemented at S6. **Do not combine wish submission with RSVP.**

**Expanded wish UI:**

- One visible textarea with placeholder: `Write me a little something...`.
- A visually hidden, accessible label for the textarea, e.g. `Your message`.
- Character counter `0/500` (count Unicode code points, not UTF-16 code units).
- `Send My Wish ♡` button, which becomes a pending state such as `Sending...` during a request.
- `Maybe later` is still reachable as a small control to collapse; do not add a modal or extra page.
- On accepted Formspree response, replace the textarea with `Your note was sent. Thank you! ♡`, perhaps with one lightweight check/heart micro-animation.
- On failure, **do not clear the draft**, do not show success, and allow retry.
- If Formspree is unconfigured, show `Wishes aren't available just yet.` instead of a fake working button.

### Validations — client-side

- Trim surrounding whitespace for submission, while keeping the current user's raw draft until success.
- Minimum length: **5 Unicode code points** after trimming.
- Maximum length: **500 Unicode code points** after trimming.
- Blank or whitespace-only message is invalid.
- Preserve intentional internal line breaks.
- Use `Array.from(message.trim()).length` (or an equivalent code-point counter) in both counter/validation to handle emoji and Vietnamese correctly.
- Do **not** blindly use HTML `maxLength={500}` as a substitute; the browser's code-unit accounting can differ from the desired code-point count.
- Invalid data must not cause a network call. Use concise, in-context English validation messages.
- Disable repeated submit clicks while pending; re-enable after a failure.

## 2. State machine (implement simply)

Use local React state only. Recommended conceptual states:

```text
COLLAPSED
  ├─ Of course! → EXPANDED_IDLE
  └─ Maybe later → COLLAPSED (no-op/skip)

EXPANDED_IDLE
  ├─ edit message → EXPANDED_IDLE
  ├─ Maybe later → COLLAPSED (draft retained)
  ├─ invalid submit → EXPANDED_INVALID (inline error)
  └─ valid submit → SUBMITTING

EXPANDED_INVALID
  ├─ edit → EXPANDED_IDLE (clear stale validation error)
  └─ valid submit → SUBMITTING

SUBMITTING
  ├─ provider success → SUCCESS
  └─ provider / network error → EXPANDED_ERROR (draft retained)

SUCCESS
  └─ show short thank-you; no second immediate submit UI
```

- Implement state with a few `useState` hooks, not a state-machine library.
- The UI should not lose guest identity props or remount the audio player when interacting with wishes.
- Use `aria-expanded` and `aria-controls` on the affirmative disclosure control, and `aria-live="polite"` or `role="status"` for async success/failure.
- Keep focus accessible: on opening, focus the textarea if straightforward; on collapsing, return focus to the opening control. Avoid focus traps.
- Respect `prefers-reduced-motion`; reuse existing transitions and never force scroll hijacking.

## 3. Data contract — exact

**Server-side source of truth:** the existing guest lookup in `src/data/guests.ts` (or its existing module). **Do not read the URL from the wish form and do not import the entire guest list into a client component.**

The server invitation composer passes ONLY the current guest's values as props:

```ts
export type GraduationWishFormProps = {
  guestSlug: string;
  guestDisplayName: string;
};
```

The client sends these Formspree fields on submission:

```text
message            = trimmed textarea content
 guest_slug         = guestSlug (already resolved by the server)
 guest_display_name = guestDisplayName (already resolved by the server)
```

The leading spaces above are indentation only; the actual field names are **exactly** `message`, `guest_slug`, and `guest_display_name`.

**Do not create:** visible `FROM`, name, email, relationship, sender selection, or extra free-text note fields.

**Privacy trade-off:** Formspree runs directly in the browser. A technically knowledgeable person can modify the posted metadata or forward the invitation link. The UI may show the resolved guest name, but must **not promise identity verification**, tamper resistance or one-submission-per-guest enforcement. Only the current guest's values should reach the browser; do not leak the full guest list.

## 4. Stage S4 — Build the interaction first

### Files (minimal expected set)

- `src/components/invitation/GraduationWishForm.tsx` — add as a **client component** if absent; otherwise extend the existing one.
- `src/components/invitation/InvitationSections.tsx` — replace the existing static wish placeholder with the functional component in the correct location.
- `src/components/invitation/InvitationPage.tsx` — thread **current guest slug and displayName** from already-resolved server data, without changing the lookup logic.
- `src/data/content.ts` — centralize the new English copy if the existing project already centralizes content there.
- `src/app/globals.css` — minimal scoped styling if needed; reuse existing animation classes and tokens.

Inspect actual component signatures first and adapt to them. Do not duplicate the wish section or split the layout into a new page.

### Implementation procedure

1. Locate the existing static `GOT SOMETHING TO TELL ME?` content.
2. Keep the heading, background and editorial spacing consistent with the approved UI.
3. Add interactive progressive disclosure; ensure textarea is initially absent/hidden from both screen and keyboard focus.
4. Implement single textarea, code-point counter, validation, draft preservation, focus handling and pending/success/error display.
5. Make submit behavior injectable or clearly separated so S5 can wire the actual provider without rewriting UI. It is acceptable to complete S4+S5 together in one run.
6. If `NEXT_PUBLIC_FORMSPREE_FORM_ID` is missing, do not simulate provider success. The expanded form may render but must clearly show an unavailable state and disable real submission.

### S4 acceptance criteria

- Initial scroll → only question + two choices; no automatic expansion.
- Affirmative click or keyboard activation → textarea + counter + submit button.
- Skip/collapse does not submit and does not erase a draft.
- 4 characters invalid; 5 valid; 500 valid; 501 invalid; blank invalid; emoji/diacritics count correctly.
- No sender name/email input.
- No regression to envelope, music player, route lookup, typography or layout.

## 5. Stage S5 — Connect Formspree (NO custom backend)

**Chosen integration approach: native `fetch` + `FormData`.** This avoids a library and fits the simple existing component. The form's public ID is not an API secret.

### Configuration

Create or add to `.env.example` if it doesn't exist:

```dotenv
# Public Formspree form ID (not a secret); obtain from the Formspree dashboard.
NEXT_PUBLIC_FORMSPREE_FORM_ID=
```

Real configuration belongs in the existing ignored root `.env.local`, or in Vercel environment variables **when deployment is approved**, not in source code:

```dotenv
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_real_form_id_here
```

- Access with the **literal** `process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID` expression (Next.js replaces public environment variables at build time).
- Validate that the ID is non-empty and plausibly matches a Formspree form ID before making requests; do not invent a default ID.
- When the ID is missing, leave site build and UI working, but explicitly disable live submission. No provider call should occur.
- For development, restart `npm run dev` after editing `.env.local`; for deployment, rebuild with the proper value.
- Do not create a Formspree account or submit to real inboxes without an available ID/configured form.

### Network request contract

Send a request **directly from the client** to:

```text
POST https://formspree.io/f/<FORM_ID>
Accept: application/json
Body: FormData
```

Set these **exact** FormData names:

```ts
const payload = new FormData();
payload.set("message", message.trim());
payload.set("guest_slug", guestSlug);
payload.set("guest_display_name", guestDisplayName);

const response = await fetch(`https://formspree.io/f/${formId}`, {
  method: "POST",
  body: payload,
  headers: { Accept: "application/json" },
});
```

Important implementation details:

- **Do not manually set `Content-Type` for `FormData`**; the browser must set the multipart boundary.
- Check `response.ok` before success, and treat 429 and non-2xx responses as failures.
- Avoid assuming every error response has valid JSON; parse error bodies defensively only when useful. Do not expose provider internals to guests.
- Treat lost/failed network responses as unknown and show failure/retry rather than claiming that a message was saved.
- Disable submit during pending. Preserve the draft if the request fails.
- Success message is allowed **only after a successful Formspree response**. Confirm actual Dashboard delivery separately during manual end-to-end testing.
- Provider-side spam filters, quota and rate limits may reject or suppress deliveries; surface actionable but nontechnical error text.

### Suggested English message mapping

| Case | Guest-facing response |
| --- | --- |
| Invalid/blank | `Write a little something first ♡` |
| Too short | `A few more words, please ♡` |
| Too long | `Keep your note within 500 characters.` |
| Sending | `Sending...` |
| Success | `Your note was sent. Thank you! ♡` |
| Rate-limited (HTTP 429) | `Too many tries. Please wait a little and try again.` |
| Offline/network/provider error | `Couldn't send your note. Please try again.` |
| Form ID missing | `Wishes aren't available just yet.` |

No toast dependency. Inline status in the section is sufficient.

### Formspree owner setup (human action, not Codex)

1. Create one Formspree form in the intended owner's account.
2. Choose and verify the **target recipient email** in Formspree settings. No email address is embedded in frontend code.
3. Copy the form's public ID from its dashboard.
4. Put the ID in `.env.local` for local testing; later add it to Vercel settings when approved.
5. Make **one deliberate end-to-end test** from a demo invitation and verify the actual message and metadata appear in Formspree Dashboard; check configured email notifications separately. Do not repeatedly hit the live endpoint in automated tests.

### S5 acceptance criteria

- With no form ID: build works, form honestly unavailable, **zero requests**.
- With a configured, testable ID: one valid user action produces **one POST** with exactly the three specified data fields.
- On 2xx: show success and hide the textarea.
- On 4xx/5xx/network failure: retain draft, show English error, allow retry.
- On 429: provide rate-limit-specific feedback.
- A duplicate click while pending does not send a second request.
- Only the current resolved guest's name/slug is submitted; no full guest directory leaks into JS.
- No Supabase or custom wishes API is added.

## 6. Tests and regression checklist

**Required local commands:**

```bash
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

**Functional checks (manual or mocked fetch, no live spam):**

| Test | Expected |
| --- | --- |
| Visit `/demo-friend` | Same envelope and invitation; question starts collapsed |
| Click `Of course! ♡` | One textarea; focus accessible; counter shown |
| Click `Maybe later` | Collapses; no HTTP request; draft retained |
| Submit empty / 4 / 501 code points | Client validation; zero requests |
| Submit 5 / 500 code points | Valid; request permitted only if configured |
| Enter Vietnamese text and emoji | Proper rendering and code-point count |
| Form ID missing | Honest unavailable state; no request; production build succeeds |
| Mock 2xx | Thank-you only after response arrives |
| Mock 429 | Rate-limit feedback and retained draft |
| Mock 500 / rejected fetch | Error + retained draft + retry option |
| Double click during pending | One request only |
| Invalid `/[slug]` | Existing 404 behavior unchanged |
| 360, 390, 430, 768, 1024, 1440px | No horizontal overflow or textarea collisions |
| Keyboard and reduced motion | Focus and disclosure accessible; no forced animation |
| Audio on/off and envelope open | Previous S3 behavior unchanged |

If the environment lacks a browser, **do not claim visual verification**. Report which checks ran and which require manual browser confirmation. Do not install a test framework solely for this small scope.

## 7. Explicit non-goals

- No backend API or database, no SQL, no Supabase.
- No authenticated user accounts or recipient dashboard built in Next.js.
- No guaranteed single submission per guest, no persistent client-side tracking, no fake identity verification.
- No public list of wishes or display of others' messages.
- No additional `FROM`, email, RSVP, plus-one, reminder, or dietary fields.
- No change to existing editorial design, fonts, layout rhythm, map, audio, envelope, scroll motion, calendar, RSVP, SEO, or Git setup unless a demonstrated S4/S5 bug requires it.
- No new component library, animation library, form library, or state management library.
- No deployment, commit or push.

## 8. Completion report format (keep it short)

At the end, answer with these exact sections:

```text
S4: DONE / PARTIAL / BLOCKED
S5: DONE / PARTIAL / BLOCKED

Changed files:
- <file>: <one-line reason>

Verified:
- lint: pass/fail
- TypeScript: pass/fail
- build: pass/fail
- interactions: list only actually tested cases

Configuration needed:
- Formspree form ID: supplied / missing
- Real delivery verified: yes / no

Known limitations:
- <only real remaining limitations>

No commit, push or deployment performed.
```

**If the Formspree ID is missing:** S4 may be DONE and S5 is **CODE IMPLEMENTED, LIVE DELIVERY NOT VERIFIED**. Do not pretend a real message was delivered.

---

## 9. EXECUTION PROMPT — Recommended single run

Copy this short command into Codex **after placing this file in `docs/`**:

```text
Read docs/PROJECT_SPEC.md (§§0, 3, 9, 11–12) and docs/CODEX_S4_S5_IMPLEMENTATION.md.
Preserve all existing staged/unstaged S1–S3 work. Implement S4 + S5 now exactly as specified: progressive one-textarea wish UI, validation, guest metadata from server-resolved props, and direct Formspree submission with honest success/error/config states.
Keep the approved visual design untouched. No custom backend, Supabase, new packages, RSVP/calendar, deployment, commit, or push.
Run lint, TypeScript, build and relevant mocked/interactive checks; report results using the handoff format and stop.
```

### Optional: two separate runs for a less capable model

**Run A — S4 only:**

```text
Read docs/CODEX_S4_S5_IMPLEMENTATION.md §§0–4, 6–8 and docs/PROJECT_SPEC.md §9. Implement S4 ONLY: preserve the current UI; add progressive disclosure, exactly one textarea, validation, code-point counter, accessibility, and state handling. Do not send live requests or create a backend. Preserve all staged/unstaged changes. Run lint, typecheck, build and summarize. No commit/push.
```

**Run B — S5 only (after inspecting Run A):**

```text
Read docs/CODEX_S4_S5_IMPLEMENTATION.md §§0–3, 5–8. Inspect the S4 component and preserve its UI/behavior. Implement S5 ONLY: direct Formspree fetch, public form ID config, metadata fields, failure/retry/429/success handling and configuration instructions. Do not add a backend, DB, or dependencies. Test with mocked responses; do not claim real delivery without configured Formspree. Run lint, typecheck, build, then report. No commit/push.
```

---

## 10. Authoritative links (only if implementation details are unclear)

- Formspree React guidance: https://help.formspree.io/articles/working-with-react/the-formspree-react-library
- Formspree JavaScript/AJAX guidance: https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax
- Formspree system limits and 429 responses: https://help.formspree.io/articles/form-and-project-settings/system-limits
- Next.js public environment variables: https://nextjs.org/docs/app/guides/environment-variables

These are references, not instructions to add libraries. Follow the native-fetch integration contract above.
