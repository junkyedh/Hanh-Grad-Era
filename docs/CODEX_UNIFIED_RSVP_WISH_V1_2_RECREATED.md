# CODEX IMPLEMENTATION HANDOFF — V1.2
## Unified RSVP + Optional Wish + Focused UI/UX Refinements

> **Status:** Approved implementation instructions, not a report that code is already changed.  
> **Active spec in repository:** `docs/PROJECT_SPEC.md`. This handoff overrides conflicting **separate RSVP/SMS, separate wishes, brand/CTA, and location/contact UI** requirements in older plans. After implementing, update only the affected sections of the active spec.  
> **Existing work:** S1 (personalized routes), S2/S2R (editorial UI), S3 (music/motion), S4 (wish UI), and the Formspree submission implementation from S5 exist already. Preserve them; refactor the narrow parts required below.  
> **Execution:** IMPLEMENT this handoff only. No commit, push, deploy, or unrelated redesign.

## 1. Outcome and scope

**Target:** A visitor opens a personalized invite, selects attendance, optionally writes a message, and sends **one Formspree submission**. The section must be understandable instantly on mobile and desktop, with a playful but restrained editorial submit button.

Authorized minor visual improvements:
1. Replace the small, repetitive site-brand label.
2. Rename and unify the location/contact section.
3. Display a usable location preview (when source has confirmed coordinates) and working directions/call links.
4. Rebuild the cramped wish/RSVP layout as one clear form.
5. Remove the excessive heart symbols and make the submit interaction visually distinctive.

**Explicit non-goals:** No SMS-based RSVP, separate wishes submission, Supabase, database, custom Next.js API, authentication, admin dashboard, another Formspree form, map SDK, new UI library, music rewrite, new animations across unrelated sections, new guest identities, or fabricated map coordinates.

## 2. Inspect before editing

Run `git status --short`; inspect relevant working-tree and staged diffs before touching files. Read only these files and their direct imports where present:

- `src/components/invitation/GraduationWishForm.tsx` (refactor/reuse for unified form)
- `src/components/invitation/InvitationPage.tsx` (pass current guest metadata)
- `src/components/invitation/InvitationSections.tsx` (remove old standalone wishes/RSVP CTA, update location)
- `src/data/content.ts` (all English UI copy)
- `src/data/event.ts` (authoritative venue/contacts/directions; no invented values)
- `src/app/globals.css` (scoped form and contact styling)
- Existing Formspree environment variable and utilities, only as required

Preserve the already approved Barlow Condensed / Be Vietnam Pro pairing, paper/cream/cherry/cobalt palette, envelope, `I DID IT!`, reduced-motion handling, audio controls, image placeholders, server-side personalized guest lookup, and noindex/privacy behavior.

## 3. Final copy contract (English-first)

Centralize text in `src/data/content.ts` where the current code already supports it. Avoid scattering text literals across JSX.

| Element | Exact text / rule |
|---|---|
| Small top-left/intro/cover brand label | `SPECIAL DELIVERY` |
| Existing complementary editorial issue label | Keep as currently configured; do not duplicate it |
| Location section headline | `FIND ME THERE` |
| Map/location subheading | `WHERE` |
| Contact subheading | `NEED A HAND?` |
| Contact helper | `Need help finding the venue? Give us a call.` |
| Map action | `GET DIRECTIONS` |
| Call action | `CALL` |
| Survey headline | `WILL YOU BE THERE?` |
| Survey helper | `I'd love to know if you can make it.` |
| Yes radio | `I'll be there!` → `attending` |
| No radio | **`Sending love from afar`** → `not_attending` (keep exact wording) |
| Optional note disclosure | `Leave me a little note?` |
| Optional note description | `Optional — only if you feel like it.` |
| Textarea placeholder | `Write me a little something...` |
| Main submission button | **`SEAL & SEND`** + compact envelope/arrow icon |
| Pending label | `SENDING...` |
| Confirmed success | `Delivered! Thanks for letting me know.` |
| Missing attendance | `Choose an option before sending.` |
| Invalid nonempty note (<5 characters) | `A few more words, please.` |
| Note >500 characters | `Your note is a little too long.` |
| Missing Formspree configuration | `Replies aren't available yet.` |
| Request failure | `Couldn't send your reply. Please try again.` |
| Rate limit | `Too many attempts. Please try again later.` |

Do not rename the project/repository or remove the graduate's actual name. Vietnamese names, configured guest `displayName`, and official place names may remain Vietnamese. Don't mention external reference brands or source inspiration in any UI/code/docs.

**Heart icon budget:** Use no heart symbols in the RSVP radio labels, submit CTA, status messages, and helper sentences. One small heart motif may remain in the closing decorative section if already present; do not repeat `♡` after every label/paragraph. Preserve the personal tone through copy and visuals rather than glyph repetition.

## 4. One unified RSVP + optional wish (replace both old flows)

### 4.1 Component and layout

Reuse `GraduationWishForm.tsx` as the single interactive survey/form component (rename only if a small safe refactor is clearly justified). It must be mounted in ONE place. Do not keep a separate RSVP pair of `<a>`/SMS links in `FinalNote` or a second `GOT SOMETHING TO TELL ME?` submit section.

Visual hierarchy:

1. **Left:** oversized editorial `WILL YOU BE THERE?` headline, no unnecessary label/intro paragraph.
2. **Right:** broad form panel containing a short helper, radio choices, optional-note disclosure, textarea (when expanded), one expressive submit CTA, and one feedback region.
3. Keep closing `NO GIFTS, JUST YOU!` as a distinct short editorial closing moment, but **no duplicate RSVP controls** inside it.

### 4.2 Radio choices

- Both radio options are visible without any click; initially **neither is selected**.
- Use native semantic `<input type="radio">` with shared name, `<fieldset>` and visually appropriate `<legend>` or `aria-labelledby`.
- Use large, clickable label **cards/rows** (at least 44px high), clear circle/ring and selected accent (e.g. cherry or cobalt), high contrast and visible keyboard focus. Avoid link-like underline-only options.
- Exact `not_attending` visible label: **Sending love from afar**.
- Selectable with mouse, touch, arrows/space as native controls permit. On change, keep the optional note draft intact.

### 4.3 Optional wish

- Initial state **collapsed**.
- Show one clear disclosure `Leave me a little note?`, plus a small `Optional` note, **below** the attendance options.
- Clicking toggles one textarea; do not automatically expand on scroll.
- Do not require a note when submitting attendance.
- If text is nonempty after trim, validate **5–500 Unicode code points**; when empty, send `message: ""`.
- Keep the draft on collapse, retry, changing attendance, or network error.
- Character counter has its **own right-aligned row** under the textarea, with no concatenation to action text.
- Remove `Of course!`, `Maybe later`, `Send My Wish`, and all separate wish-submit controls from the unified form.

### 4.4 A distinctive but accessible submit control

**Required design (do not render a generic underlined text link):**

- Use a prominent wide rectangular **postal-action button** matching the editorial aesthetic: strong border, text `SEAL & SEND`, compact square icon zone at the right with an envelope or northeast arrow drawn using lightweight CSS/SVG (reuse any existing icon if available). Prefer ink/cream or cherry/ink contrast that passes accessibility.
- Give it a subtle *slide-to-dispatch* feel **visually**, e.g. icon moves ~4–8px and background/color shifts on hover/focus; on active/tap compress slightly; on pending show `SENDING...` with a small non-distracting progress indicator.
- This is still a **normal `<button type="submit">`**. Do NOT require dragging/swiping to submit; keyboard and mobile click must work.
- Only one primary CTA. Disabled until attendance chosen, wish valid (or empty), Formspree ID valid, and not sending; explain unavailable state without false success.
- After `response.ok`, replace the input controls with a succinct **`Delivered!`** confirmation. A one-shot stamp/check micro-transition is optional and must respect reduced motion.
- Do not use `♡` in this button or confirmation. No emoji spam, confetti, large GIFs, animation libraries or redundant adjacent arrows.

### 4.5 Data contract / state

```ts
type Attendance = "attending" | "not_attending";

type UnifiedReply = {
  guest_slug: string;
  guest_display_name: string;
  attendance: Attendance;
  message: string; // optional; "" when absent
};
```

Use the **existing** personalized route to obtain `guestSlug` and exact `guestDisplayName`; no sender-name field, email field, or relationship selector.

Only **one** Formspree request per user submit, using the **existing** `NEXT_PUBLIC_FORMSPREE_FORM_ID`:

```ts
const payload = new FormData();
payload.set("guest_slug", guestSlug);
payload.set("guest_display_name", guestDisplayName);
payload.set("attendance", attendance);
payload.set("message", note.trim());

const response = await fetch(`https://formspree.io/f/${formId}`, {
  method: "POST",
  body: payload,
  headers: { Accept: "application/json" },
});
```

- Validate allowed attendance before request and retain one `submitLock` while pending.
- Server response `ok` → show success; non-OK → show error, special handling for 429; exception → show network error.
- Retain inputs on error; never report submission as successful when Formspree is not configured.
- Guest metadata in a browser POST is **contextual, not verified identity**; a forwarded link can be reused. Formspree cannot guarantee one response per guest slug. Do not claim unique-submission enforcement or build a new backend to simulate it.

## 5. Layout fixes — specifically prevent the observed cramped UI

The current desktop rules contain a shared `.wishes-preview, .final-note` grid with `1.2fr .8fr; gap: 10%`, which forces the form into the narrow right column. Replace **only the relevant form layout**; do not alter the final decorative section unnecessarily.

At **<1024px**: one column (headline then full-width form), adequate comfortable padding; radio rows and textarea fill available width. At **≥1024px**: two-column composition with the **form wider than the headline**, e.g. `minmax(0,.8fr) minmax(0,1.2fr)` and a bounded `gap: clamp(32px,5vw,80px)`.

Use scoped class selectors, `min-width:0`, `width:100%`, controlled max-width where needed; avoid global `.text-action` changes. Form helper, radio cards, note disclosure, character count, CTA and status must have deliberate vertical spacing. Counter and submit button **never** occupy one visually concatenated line. Avoid horizontal scrolling at 360/390/430/768/1024/1440 widths. Inputs/buttons are comfortably tappable.

## 6. Location / contact cleanup

### 6.1 Titles and hierarchy

- Replace generic `THE DETAILS` with **`FIND ME THERE`**.
- Keep left **`WHERE`**.
- Rename right **`ON THE DAY`** to **`NEED A HAND?`** and use the single helper sentence in §3.
- **Remove finance/coin illustration from the contact area.** Accounting-themed decoration may remain in the dedicated balance-sheet section only.
- Recompose the right column as one intentional block: heading → helper → contact name + number → working `CALL` anchor. Avoid empty filler and arbitrary vertical gaps.
- Keep the dark/cream editorial styling, large title, map/venue on left, contact on right on desktop. Stack map before contact on mobile, retaining a clear divider.

### 6.2 Usable map and accurate directions

- Use **existing approved event configuration** as the single source of truth for venue name, contact and navigation URL. Do not hard-code a new venue, campus, entrance or phone number.
- The previously supplied Google Maps share URL is a **navigation link** and **must not** be used as an `<iframe src>`.
- If verified location coordinates already exist in project data, add a small **OpenStreetMap iframe** preview with an appropriate bbox/marker and visible attribution, `title`, `loading="lazy"`, stable height and responsive full width. No API key or map SDK.
- If exact coordinates are not present in checked-in data, do **not** guess; keep an intentional map placeholder with a clearly actionable `GET DIRECTIONS` link. The fact that a navigation URL exists alone is not proof of a particular point to embed.
- `GET DIRECTIONS` must open the **approved Google Maps destination link** with `target="_blank"` and `rel="noopener noreferrer"`.
- Contact phone uses its exact configured value and a working `tel:` link; keep the help contact name intact.
- Check iframe failure/blocked scenarios visually; keep the directions link available regardless.

## 7. Minimality and consistency

- Preserve the existing main `I DID IT!` and `NO GIFTS, JUST YOU!` moments (do not add hearts to the headlines).
- Replace only the tiny `HANH'S GRAD ERA` branding with **`SPECIAL DELIVERY`**, keeping any complementary `THE GRADUATION ISSUE` small label already present. Avoid replacing every graduate reference.
- Keep the amount of text minimal: no new site navigation, section index numbers, repeated footer, second intro paragraph, extra address blocks, or separate survey/wish page.
- No separate tracking or identity verification. Owner reviews RSVP + optional wishes in **one existing Formspree form**; submissions include `guest_slug`, `guest_display_name`, `attendance`, `message` and Formspree timestamp. Email alerts are configured externally; do not code a mailing service.
- Update relevant sections of `docs/PROJECT_SPEC.md` to replace old SMS RSVP/separate wishes language. Do not create a second active project specification or repeat the entire history.

## 8. Acceptance criteria — MUST verify

### UI / copy
- [ ] Header eyebrow says `SPECIAL DELIVERY`, with no duplicated editorial issue label.
- [ ] Location title says `FIND ME THERE`, and right title says `NEED A HAND?`.
- [ ] Right contact area has **no coin icon** and presents a coherent call block.
- [ ] Valid configured directions URL and phone are functional; map preview is correct when coordinates are available, otherwise honest fallback remains.
- [ ] One unified form with headline `WILL YOU BE THERE?`, two large selectable radios, optional collapsible note, a large `SEAL & SEND` button.
- [ ] Nonattendance visible copy is **exactly** `Sending love from afar`.
- [ ] No duplicate `Of course!` / `Maybe later` / `Send My Wish` / SMS RSVP links.
- [ ] No repetitive `♡` in CTA/radios/statuses. A small decorative heart elsewhere is fine.
- [ ] At mobile and desktop widths, no cramped right-side form, text/button collisions, overflow or cut-off Vietnamese glyphs.

### Functional
- [ ] No radio is preselected; attendance is required.
- [ ] Optional note opens/closes, retains draft, is 5–500 Unicode code points only when nonempty.
- [ ] RSVP-only and RSVP+note both produce **one request** with exactly the expected field names.
- [ ] No sender-name or email input.
- [ ] Block double-submit while pending. Error/429/offline preserve selection and text.
- [ ] No false success when Formspree ID missing or network request fails.
- [ ] Confirmed success replaces form with delivered/thank-you state.
- [ ] Guest personalization, envelope, fonts, music, animations, reduced motion and privacy remain intact.
- [ ] No extra backend, third-party packages, Formspree endpoints, or data stores added.

### Verification / completion
- [ ] Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, `git diff --check`.
- [ ] Validate viewport widths 360, 390, 430, 768, 1024, 1440 where browser tooling is available.
- [ ] If possible mock the response states and inspect actual FormData payload; **do not claim live Formspree delivery** unless an actual external submission was performed with a configured ID.
- [ ] Report changed files, successful/failed checks, configuration blockers and what was not verified.
- [ ] Preserve all staged/unstaged work. **STOP. Do not commit, push or deploy.**

## 9. Short invocation for Codex

```text
Read docs/PROJECT_SPEC.md and docs/CODEX_UNIFIED_RSVP_WISH_HANDOFF.md.
Inspect git status and existing components first; preserve all local changes.
Implement ONLY the unified RSVP + optional wish and the targeted UI/UX refinements in the handoff.
Use one existing Formspree endpoint. Keep the approved editorial experience, personalization, fonts, animation and music intact.
No SMS RSVP, no duplicate wish form, no backend/database/new dependencies.
Run lint, types, build, diff check and available mobile/desktop interaction checks.
Update only the affected sections of docs/PROJECT_SPEC.md, summarize results, then STOP.
Do not commit, push or deploy.
```
