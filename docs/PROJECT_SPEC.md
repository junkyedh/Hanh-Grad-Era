# Graduation Invitation Website — Project Specification

> **Version:** 1.4.1 — Clean, privacy-conscious specification  
> **Canonical repository path:** `docs/PROJECT_SPEC.md`  
> **Status:** S1 complete; S2 implemented and technically verified, but visual refinement is required. **Next: S2R + S3 only.**  
> **Authority:** This document supersedes earlier plans and chat prompts where they conflict.  
> **Scope:** Requirements and implementation plan; **not** a claim that the changes below are already implemented.

## 0. Codex working agreement

- This is an **existing Next.js application**. Do not scaffold a new project, initialize Git, modify remotes or overwrite starter configuration without a demonstrated need.
- **Start with `git status` and inspect current diffs.** Preserve all staged and unstaged changes from S1 and S2. Do not reset, clean, force-checkout, commit, push or deploy unless explicitly requested.
- `docs/PROJECT_SPEC.md` is the **only active specification**. Previous files in `docs/` are historical, not competing instructions. Do not create a second active specification at repository root.
- **Next execution scope:** implement **S2R (editorial visual refinement)** and **S3 (motion/music foundation)** only. S4–S8 remain out of scope until separately approved.
- Reuse existing components and data models. Avoid implementing duplicate components or rewriting completed S1 routing.
- Keep changes lightweight: prefer CSS, SVG and browser APIs. Do not add an animation library, map SDK, state manager, CMS or backend merely for convenience.
- Preserve privacy in reports: refer to roles such as *graduate*, *guest* and *help contact* rather than repeating names, phone numbers or identifying details. Use values already configured in local source files.
- After changes, run ESLint, TypeScript, production build and relevant interaction/viewport tests. Give a short changed-file summary and remaining limitations, then stop.

**Read only what is relevant:** S2R/S3 → §§0–8, 11–13; S4/S5 → §§0–3, 9, 11–13; S6 → §§0–3, 7, 10–13; S7/S8 → §§0, 11–15.

## 1. Current project state

### 1.1 Existing stack

- Next.js App Router, React, strict TypeScript, Tailwind CSS, ESLint and npm; target deployment: Vercel.
- Existing `src/app/` layout and `@/*` imports must be respected. Inspect local `package.json` and `next.config.ts` for actual versions and feature flags rather than relying on memory.
- No separately hosted application backend is needed. **Formspree** is the approved external service for sending wishes in a later stage.

### 1.2 Stage S1 — complete; preserve

Implemented personalized `/[slug]` routes, a neutral root route, safe 404 behavior, generic sharing metadata, server-only guest/event/content data, a shared invitation type and initial server-rendered invitation composition. Previous checks covered demo guests, display-name overrides, correct event data and absence of the entire guest list from browser bundles.

### 1.3 Stage S2 — technically complete; **visual review pending**

Implemented the envelope intro, client-side invitation experience, main editorial sections, font/style foundation and a no-JavaScript fallback. Previous reported checks passed lint, types, production build, six viewport widths, keyboard interactions, reduced motion and S1 regressions. Music, wishes and event actions were left for later stages.

**Visual problems identified in the current desktop screenshot:** excessive unused background space, a relatively small centered envelope, weak/ordinary headline treatment, redundant opening CTA and music-development text, inconsistent Vietnamese glyph rendering and insufficient movement/graphic rhythm. **A passing build does not mean this visual design is approved.**

This specification is based on the reported implementation and reviewed screenshots; Codex must inspect the actual local working tree before editing.

## 2. Product goals and fixed content policy

- Product: a **personalized graduation invitation** for a small number of individually invited guests.
- Art direction: **Letter Intro × Fashion Editorial × Playful Elegance**.
- Goal: a memorable, simple, personal interactive experience — not a traditional event-registration website or generic startup landing page.
- **Use values already defined in `src/data/event.ts`** for the date/time, venue, directions and contact details. Do not introduce new dates, people, phone numbers, entrance gates or parking advice.
- The configured **10:00–12:00** interval is the **guest meet-up/photo window**, not an asserted official ceremony schedule. Calendar and page copy must describe it accurately.
- Keep real names, exact honorifics and contact information in the project data/configuration, **not duplicated inside this specification**. The spec intentionally uses role names and placeholders to avoid unnecessary personal details.
- No real photographs or soundtrack have been supplied yet. Use intentional visual placeholders and graceful missing-asset behavior until authorized assets are added.

## 3. Voice, language and content density — strict

### 3.1 Language

- **English-first UI throughout:** headlines, invitation text, button labels, helper text, validation, errors, RSVP/SMS copy, decorations and accessibility labels.
- Allowed exceptions: configured Vietnamese **guest `displayName`**, names of participants/contacts, and official place names as stored in source data. Do not automatically prepend English “Dear” or append a second honorific to `displayName`.
- Do not infer Vietnamese pronouns, honorifics or gender from guest names; use exact configured values.
- Test diacritics; do not replace accented text with unaccented approximations to hide typography bugs.

### 3.2 Narrative perspective

- This is a **first-person invitation from the graduate**. Prefer **`I DID IT!`**, **`I GRADUATED!`**, “I’d love to celebrate with you” and similar personal phrasing.
- Do **not** use “SHE DID IT!”, “she graduated”, or repetitive third-person descriptions of the graduate in editorial copy.
- An existing brand/title is not automatically problematic; only fix incongruent narrative language. Never indiscriminately replace pronouns in user-provided `customMessage` content.

### 3.3 Keep it concise

- One dominant headline per major visual moment; at most one short explanatory line unless necessary.
- No decorative section numbers (`01`, `02`, `03`), unnecessary repeated date/location/name blocks, persistent mini-header on every panel or oversized footer.
- No duplicate opening controls. Avoid “coming soon” text on production-facing UI.
- Centralize adjustable English copy in `src/data/content.ts` when possible.

**Optional copy vocabulary:** `A LETTER FOR YOU`, `OPEN`, `I DID IT!`, `IT'S A DATE!`, `THE DETAILS`, `WHERE`, `ON THE DAY`, `GOT SOMETHING TO TELL ME?`, `Of course! ♡`, `Maybe later`, `Send My Wish ♡`, `NO GIFTS, JUST YOU! ♡`.

## 4. Visual identity — S2R priority

### 4.1 Look and feel

- High-contrast **bold condensed editorial headlines**, expressive typographic hierarchy, tactile paper/grain texture, sharp rules, strong graphic scale and deliberate asymmetry.
- Primary tokens: `cream #FFF9EF`, `cobalt #2854D9`, `cherry #E5383B`, `blush #F3B9C9`, `butter #F7E19B`, `ink #161616`, off-white `#F9F5EB`.
- Prefer a considered rhythm of cream, ink and red; use cobalt sparingly for playful accents rather than making every button/headline blue.
- Sections should read like an editorial lookbook, **not a stack of identical cards**.
- Add subtle texture with lightweight CSS/SVG (paper grain, postal marks, diagonal line, abstract stamp). Do not request external assets or use heavy GIF/video backgrounds.
- Original finance/accounting accents: at most **3–5** small calculator/ledger/chart/stamp SVG or CSS stickers, plus at most one brief joke panel. This is a light motif, not a finance dashboard.

### 4.2 Desktop envelope intro

**Current defect:** a small, sparse centered envelope on a nearly empty canvas.

**Target behavior and layout:**

1. At **1440×900**, create a balanced full-viewport composition with a strong, oversized condensed editorial display statement. Layout may use overlapping blocks or deliberate asymmetry without hiding actual content.
2. Make the envelope/paper layers a **large, tactile, interactive centerpiece** (rough design reference: 40–60% of available composition width, adapted to layout).
3. Compose paper folds, a tiny heart/seal, a restrained date stamp and a very light patterned/grain background. **Do not fix emptiness by adding many paragraphs or buttons.**
4. Let the **envelope itself** be the accessible clickable target (`button` semantics, keyboard activation, visible focus). Choose **one** opening affordance; remove a redundant large “Open Invitation” CTA when the envelope already makes the action clear.
5. Show the guest’s configured display name exactly once in the intro. Avoid extra title/status labels.
6. A music control should be discrete when music is available. Hide or disable it gracefully if audio is missing; remove noisy development copy such as “Music available soon”.
7. At mobile widths 360–430px, retain recognizable envelope geometry and clear touch interaction without horizontal overflow.

### 4.3 Main invitation rhythm

- Cover: one oversized first-person headline, graduate brand/name from configuration, a deliberate portrait placeholder and minimal accompanying text.
- Personal letter: one concise conversational English paragraph with resolved guest treatment; do not duplicate it in other sections.
- Event details: bold date/photography time and official venue, but avoid repeating facts throughout the page.
- Closing: short no-gifts note and simplified RSVP choices.
- Alternate dark/cream blocks, crop/scale display typography with care, use striking lines and whitespace **purposefully**.
- RSVP visual inspiration: a large typographic question beside two simple choices. **Do not add name/email/reminder/note fields or a gimmicky slide-to-submit control.** Functional SMS handling belongs to S6.


## 5. Typography — Fixed Font Specification (S2R)

FONT DECISION: FINAL.

Use EXACTLY TWO font families:

1. Barlow Condensed
2. Be Vietnam Pro

Both fonts support Vietnamese subsets.

Do not research, compare, or install alternative fonts.
Do not add a third font family.
Do not use external font CDN links.

### Font Responsibilities

BARLOW CONDENSED:
- English-only oversized editorial headlines
- Section headings
- Decorative English typography
- Weights: 700, 800, 900
- Style: normal

BE VIETNAM PRO:
- All Vietnamese names and text
- Guest displayName
- Graduate's full name
- Venue and location text
- Invitation body
- Buttons, forms and utility labels
- Weights: 400, 500, 600, 700, 800
- Style: normal

IMPORTANT:
Never use Barlow Condensed for guest names
or Vietnamese text, even though it supports
Vietnamese glyphs.

### Required Next.js Configuration

Use next/font/google.

In src/app/layout.tsx:

import {
  Barlow_Condensed,
  Be_Vietnam_Pro,
} from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-display",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});

Apply both font variables to the root layout.

### CSS Rules

Define:

.font-display {
  font-family: var(--font-display), sans-serif;
}

.font-body {
  font-family: var(--font-body), sans-serif;
}

Use Be Vietnam Pro as the default body font.

Use Barlow Condensed only through
the explicit .font-display class.

For large headlines:
- Use responsive font-size with clamp().
- Use line-height between 0.95 and 1.1.
- Avoid overflow clipping Vietnamese text.
- Do not apply extreme negative letter spacing.
- Do not artificially stretch or scale fonts.

### Vietnamese Text Verification

Test these exact strings:

"Đ đ ă â ê ô ơ ư ạ ấ ễ ộ"
"Chị Phúc Linh"
"Dương Hải Hạnh"
"Hội trường Trần Chí Đáo"

Verify:
- Vietnamese marks render correctly.
- No glyph clipping.
- No mixed font appearance within names.
- Font weights remain consistent.
- Desktop and mobile rendering are correct.

### Scope Restrictions

- Remove unused Geist/other starter font imports.
- Do not install new font packages.
- Do not download font files manually.
- Do not modify fonts unrelated to this requirement.
- Do not redesign components solely to fix fonts.
- Do not perform an extensive font audit.

Use the specified configuration, verify the result,
and stop when the acceptance criteria pass.

## 6. Motion and music — S3 next scope

### 6.1 Envelope and editorial transitions

- User action opens envelope: layered flap rotation/paper lift, approximately **550–900ms**, then a short crossfade/scale into the invitation without blank flashing or extra clicks.
- Cover: mask/slide reveal for the large headline, image opacity + small scale, approximately **350–700ms**.
- Major sections: one-time scroll-triggered reveals using fade/translate and occasional subtle zoom (`0.96 → 1`), wipe or opposing-side entrances for map/contact columns.
- Desired effect is **presentation-like pacing**, not actual full-screen slide navigation: **natural vertical scrolling** stays intact. Do not intercept wheel/swipe or enforce snap points.
- Prefer CSS transforms/opacity and `IntersectionObserver` with safe fallbacks; avoid expensive scroll handlers, perpetual parallax, heavy blur and many infinite loops.
- Keep text still/readable once fully revealed. No repeated hide-on-scroll. Provide correct behavior when returning to a section.
- Honor `prefers-reduced-motion`; maintain accessible controls, visible focus, no-JavaScript fallback and unobstructed text.

### 6.2 Audio

- One long-lived HTML audio element owned by the invitation experience shell, not recreated on every section render.
- Music **defaults Off**. Enable only through an explicit preference/gesture; never autoplay audibly on first visit.
- Visible compact play/pause control once the music file is supplied. On failed playback, show an honest state without preventing envelope opening.
- Planned asset: `public/audio/grad-theme.mp3`. If absent, hide/disable the public music button **without adding a “coming soon” sentence**.
- Do not download or generate an unlicensed commercial music track; do not add a music-player dependency.

## 7. Location section — S2R visual refinement

### 7.1 Layout

- Use a full-width **ink/near-black** editorial band with a very large cream headline `THE DETAILS`.
- Desktop: two columns, approximately **60% map / 40% assistance**; thin dividing rule. Left: `WHERE`, generously sized muted map preview, a compact `DIRECTIONS` action and configured venue text. Right: `ON THE DAY`, one helpful English line and one clear call action.
- Mobile: clean vertical stacking (map above contact), no overflow or forced letter-size content.
- Remove artificial `01/02` labels and duplicate contact/date text.

### 7.2 Data accuracy and map implementation

- Read the **exact destination URL, venue and contact** from `src/data/event.ts`; do not substitute values from screenshots or a different venue.
- Do not invent entrance gates, parking, landmarks or ceremony schedules.
- Prefer a lightweight map preview with **no Google Maps API key**. An OpenStreetMap iframe is acceptable only with provider-compliant use and visible attribution; verify coordinates/centering against the configured venue and provide graceful fallback if blocked.
- The `DIRECTIONS` action should use the user-approved URL from event config. A simple functional external link is preferable to a costly maps SDK.
- A Google Maps iframe using the official paid/keyed API is **not** required for V1.
- The styled map/location section is S2R; fully functional map/tel actions are verified and polished in S6.

## 8. Components and existing code boundaries

**Refine existing components; do not duplicate them.** Confirm the actual names/locations in the working tree.

```text
RootLayout [server]
└── /[slug] page [server: guest lookup and 404]
    └── InvitationPage [server composition]
        └── InvitationExperience [client shell: intro, state, audio]
            ├── EnvelopeIntro [client: redesign]
            ├── MusicPlayer [client or shell-owned control; S3]
            └── invitation content [server-first]
                ├── Cover / Personal Letter / Event Details
                ├── Finance/accounting micro-decorations
                ├── Location / Map / Contacts [visual refinement]
                ├── GraduationWishForm [S4/S5 — later]
                └── Final Note / RSVP [S6 — later]
```

- Keep sensitive guest-list data **server-side**; do not send the full guest list to a client component to make animation easier.
- Preserve existing `src/proxy.ts` invalid-route handling, metadata, demo routes and explicit custom-message override behavior.
- Only introduce a small motion wrapper/map component if it materially improves readability. No global state-management library.

## 9. Personalization and wishes — future S4/S5

### 9.1 Guest model

```ts
type Guest = {
  slug: string;
  name: string;
  displayName: string; // exact preconfigured display text
  relationship: "senior" | "friend" | "junior";
  customMessage?: string; // optional English override
};
```

- One guest-specific route, one reusable invitation template. Exact `displayName` and optional English `customMessage` come from server-side configuration.
- Unknown slug returns a friendly 404; no guest-directory page or client bundle containing all guest records.
- A forwarded link is not user authentication. Do not claim that the route securely proves sender identity.
- If the repository is public, **server-only code is still visible in Git history/source**. Obtain consent before placing real invitee data in a public repository; use nonidentifying demo records until then.

### 9.2 Wishes interaction — S4

- Initial state on scroll is **question only**: `GOT SOMETHING TO TELL ME?` with `Of course! ♡` and `Maybe later`.
- **Do not auto-expand on scroll.** Clicking the affirmative action gently reveals **one textarea**, a character counter and `Send My Wish ♡`.
- No **FROM**, sender-name, email, relationship or other visible fields; guest identity context is already resolved from the link.
- Message: trimmed, **5–500 Unicode code points**, required; clear English inline validation, pending, error and confirmed-success states. Preserve draft on submission failure.
- “Maybe later” collapses/skips without blocking further scrolling.
- A successful submission can trigger a small nonessential heart/checkmark animation. Do not show success before provider confirmation.

### 9.3 Wishes delivery — S5 (Formspree only)

- Use **Formspree** for submissions directly from the browser. Form configured through `NEXT_PUBLIC_FORMSPREE_FORM_ID` or its approved equivalent.
- Submit the message and metadata derived from the current invite: `guest_slug` and `guest_display_name` (non-editable UI values). **These browser-submitted metadata values are not authenticated or tamper-proof.**
- Recipient reads messages in Formspree Dashboard and/or configured email, after Formspree setup is completed.
- Missing configuration => display an honest unavailable state. Error response => preserve draft and offer retry; success => replace form with a brief English thank-you.
- No public wishes wall; no strict single-submission-per-guest guarantee with this architecture. Duplicate submissions and basic provider limits are accepted V1 trade-offs.
- **Explicitly excluded:** Supabase, custom SQL tables/migrations, `app/api/wishes/route.ts`, user authentication, dedicated backend server, admin dashboard and custom email delivery service.

## 10. Event actions and RSVP — future S6

- **RSVP and wishes are separate actions.** Two concise RSVP options (`I'll be there!`, `Sending love from afar!`) prepare an English SMS to the configured primary contact. Opening SMS does **not** record attendance; the guest must send it. Provide copy-text / contact fallback for device differences.
- Save to Calendar generates an `.ics` file for the **configured meet-up/photo time**, not an invented official ceremony schedule. Use correct timezone/UTC conversion, UID, escaping, CRLF formatting and accurate location.
- The Google Directions URL and `tel:` links must come from centralized event config. Do not repeat contact details in multiple sections.
- No RSVP database, user accounts, reminder emails or attendance dashboard.

## 11. Performance, accessibility and responsive behavior

- Verify viewports at **360, 390, 430, 768, 1024, 1440px**, especially **1440×900** intro and small-screen map/contact layout.
- No horizontal scrolling, clipped diacritics or overlay collisions. Make touch targets approximately 44px where practical.
- Accessible envelope button, music control, wishes form, RSVP options and meaningful links. Preserve keyboard order/focus, visible focus ring, semantic headings and reduced-motion behavior.
- Images have fixed space/ratio and useful alt text. Main portrait remains an intentional placeholder until the authorized asset is supplied; no random face image.
- Prefer lightweight inline SVG/CSS decorations; avoid heavy GIF or animation dependencies. Use responsive `next/image` once real photos exist.
- Maintain usable content when animation JS fails. Do not hide critical content behind an always-running entrance animation.

## 12. Implementation stages and next scope

| Stage | Status | Expected outcome |
| --- | --- | --- |
| **S1 — Personalized routing** | **DONE** | Route lookup, demo records, metadata, 404 and private browser bundle. Preserve. |
| **S2 — Initial invitation UI** | **Technically done, visually not approved** | Envelope, page skeleton, basic responsive experience. Refine in place. |
| **S2R — Editorial refinement** | **NEXT** | Desktop envelope density, Vietnamese fonts, first-person language, typographic impact, clean sections, styled location/map layout. |
| **S3 — Motion and music foundation** | **NEXT, together with S2R** | Envelope/cover/scroll transitions, reduced motion, persistent optional audio, honest missing-asset behavior. |
| **S4 — Wishes progressive UI** | TODO | Question → reveal one textarea; validation and states, no sender field. |
| **S5 — Formspree submission** | TODO | Provider integration and error/success handling; no custom backend. |
| **S6 — Event actions** | TODO | ICS, verified directions/phone links, SMS RSVP. |
| **S7 — Final QA** | TODO | Regression, desktop/mobile visual and accessibility review, asset/provider failures. |
| **S8 — Vercel deployment** | TODO; explicit approval only | Production configuration and smoke tests. |

**Next Codex run is constrained to S2R + S3 only.** Do not implement wishes, Formspree, SMS RSVP, calendar functionality or deployment as part of that run.

## 13. S2R/S3 acceptance checklist

### Visual, content and typography

- [ ] At 1440×900 the intro has intentionally distributed editorial content, a dominant interactive envelope and very large condensed title, **not an empty centered greeting card**.
- [ ] Only one obvious envelope-opening control; no duplicate large CTA or public “coming soon” audio explanation.
- [ ] All configured Vietnamese names/place labels render correctly with accents and no mismatched glyph fallback/clipping.
- [ ] First-person graduate narrative throughout new editorial copy; no third-person graduation slogans.
- [ ] No numbered section labels, stacked redundant headers/footers, duplicated event details or long filler paragraphs.
- [ ] Palette, paper texture and small finance/accounting motifs are tasteful, distinctive and performant.

### Location, motion and music

- [ ] Full-width dark `THE DETAILS` section, clear map/contacts hierarchy, correctly configured destination and no invented location facts.
- [ ] Preview is accurate and usable, or shows an honest fallback. Required OpenStreetMap attribution appears if applicable.
- [ ] Envelope open, cover reveal and scroll beats demonstrate polished slide/zoom/fade motion without blank flashing or scroll hijacking.
- [ ] `prefers-reduced-motion` works, keyboard interactions remain accessible, and no-JS content fallback survives.
- [ ] Music defaults Off. Missing audio file does not break the page, misrepresent playback status or add visual clutter.

### Regression and code quality

- [ ] Exact S1 guest personalization, custom-message overrides, 404 and server-only full-list behavior still pass.
- [ ] Review staged/unstaged diff before and after editing; **never discard current work**.
- [ ] No overflow at 360/390/430/768/1024/1440px.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` and relevant diff/whitespace checks pass.
- [ ] Report modified files, meaningful visual checks and outstanding missing assets/configuration. No commit, push or deploy.

## 14. Inputs not yet supplied and accepted V1 trade-offs

- Still needed later: authorized photos, authorized audio file, Formspree form configuration/recipient inbox, and final production guest records.
- These do **not** block S2R or the non-audio portion of S3.
- Sending wishes through Formspree directly is simpler but does not authenticate invitees or guarantee exactly one message per link. This limitation is accepted for V1.
- Avoid inventing production values. Read configured venue, link, event time and contacts from `src/data/event.ts`; ask for missing inputs only when a requested stage truly requires them.
- Visual references are **art-direction cues only**. Do not copy another site's imagery, branding, copy, address or source code.

## 15. Version decisions

- **V1.2:** English interface except configured Vietnamese names/honorifics/places; personalized routes; interactive letter intro; wishes hidden until user intent; no sender field; SMS RSVP; music and restrained accounting graphics.
- **V1.3:** Formspree approved instead of database or custom wishes API. Backend scope minimized.
- **S1:** Personalized routing and metadata complete, preserved without committing/pushing.
- **S2:** UI skeleton implemented; technical checks passed but screenshots show visual refinement needed.
- **V1.4.1 (current):** stronger editorial composition, Vietnamese font fix, first-person graduate copy, minimal text, dark map/contact design, smooth motion, explicit `docs/PROJECT_SPEC.md` path and privacy-conscious wording.

## 16. Short execution prompt for Codex

> Read `docs/PROJECT_SPEC.md` (v1.4.1) as the sole active specification, focusing on §§0–8 and 11–13. Inspect `git status` and the existing S1/S2 implementation. **Implement S2R + S3 motion/music foundation in place:** strengthen the desktop envelope/editorial composition, fix Vietnamese fonts, correct first-person narrative, reduce text clutter, refine the dark location/map section and add smooth accessible opening/scroll transitions. Preserve all staged and unstaged work, routes, fallback behavior and existing event configuration. **Do not implement Formspree/wishes, RSVP/calendar, deployment or unrelated changes yet.** Run lint, TypeScript, production build and available viewport checks; summarize changes and blockers. **Do not commit, push or deploy.**
