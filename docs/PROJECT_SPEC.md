# Hanh's Grad Era — Project Specification

## 1. Project Overview

**Purpose:** A personalized invitation for a graduation celebration, with bilingual content and a single attendance and optional-message form.

**Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, project CSS, and Formspree. The project uses `next/font/google` for Barlow Condensed and Be Vietnam Pro.

**Architecture:** Server code resolves event and guest data and composes each invitation. Client components handle the envelope, language state, music controls, localized sections, and form interaction. There is no application-owned API or database for replies.

## 2. Application Structure

- `src/app/` contains the root layout, neutral root page, not-found page, personalized `[slug]` route, and global CSS.
- `src/app/[slug]/page.tsx` resolves a guest on the server, calls `notFound()` for an unknown slug, and provides static route parameters from the configured guest list.
- `src/components/invitation/InvitationPage.tsx` composes the invitation from server-resolved guest and event data.
- `InvitationExperience.tsx` is the client shell for opening state, language, and audio. `EnvelopeIntro.tsx` renders the envelope interaction.
- `InvitationSections.tsx` renders the cover, personal letter, event, accounting decoration, and location/contact sections using localized copy.
- `GraduationWishForm.tsx` handles attendance, the optional note, validation, and the Formspree request. `MusicPlayer.tsx` and `VenueMapPreview.tsx` provide audio and map UI.
- `src/data/content.ts`, `event.ts`, `guests.ts`, and `src/types/invitation.ts` define copy, event configuration, server-side guest lookup, and shared guest types.

## 3. Invitation Experience

The invitation opens from a native `details`/`summary` envelope control. The client shell runs the opening transition and then reveals the invitation content. The page contains a cover, personalized letter, date and photo-session time, location/map and configured contact links, and the attendance form. The configured time is the guest meet-up/photo session; it is not identified as a ceremony schedule.

The form presents `attending` and `not_attending` choices. A disclosure opens one optional message textarea. Empty messages are allowed; nonempty trimmed messages are limited to 5–500 Unicode code points. The form reports unavailable, sending, success, failure, and rate-limit states.

## 4. Localization

Vietnamese is the initial language; English and Vietnamese copy are selected by the in-page language switch. Language selection is held in React state for the mounted invitation and is not persisted across reloads. Switching language does not navigate to another route.

Copy is centralized in `src/data/content.ts`. Guest addressing is stored in guest data and selects the Vietnamese honorific. English and Vietnamese custom invitation messages can override generated messages. Event names and date formatting use the current language where implemented.

## 5. Guest Personalization

The `Guest` type includes a slug, name, display name, relationship, optional English and Vietnamese custom messages, and optional addressing. `src/data/guests.ts` is server-only: it combines the built-in demo entries with records parsed from `PRIVATE_GUESTS_JSON`, validates required fields, and rejects duplicate slugs.

The `[slug]` route resolves one record and passes only that guest’s invitation values to the rendered page. Personalized route parameters are generated from the available records. Unknown slugs use the not-found page. Custom messages take precedence over generated messages for their language.

An invitation URL is not authentication. Anyone with a link can view that invitation and submit its contextual guest fields. Search-engine no-index metadata is not access control. Because configured routes are statically generated, guest data used for a production build can also be reflected in generated pages and hosting output; use an appropriately private repository and deployment configuration.

## 6. Form Submission

The browser sends one `FormData` POST to Formspree using `NEXT_PUBLIC_FORMSPREE_FORM_ID`. Fields are `guest_slug`, `guest_display_name`, `attendance`, and `message` (trimmed, or empty). Attendance values are `attending` and `not_attending`. A submission lock prevents duplicate in-flight submits; HTTP 429 has a separate rate-limit state. The request is disabled when the public form identifier is absent or invalid.

The Formspree identifier is a public client-side configuration value, not a private credential. The form does not authenticate the guest or guarantee one response per invitation. Do not use real submissions for routine verification.

## 7. Media and Visual System

The visual direction is an editorial paper invitation with cream, ink, cherry, cobalt, blush, and butter colors defined in `src/app/globals.css`. Barlow Condensed is used for display typography; Be Vietnam Pro supports body copy and Vietnamese text. The layout adapts through CSS breakpoints, with Vietnamese-specific sizing adjustments.

Music uses one looping audio element for `/audio/grad-theme.mp3`; the control is rendered when that asset is available. Playback is attempted from the envelope-opening gesture when enabled, and the user can toggle it. Blocked and unavailable playback have UI states.

The envelope and section reveals use CSS transitions and `IntersectionObserver`. Reduced-motion preferences bypass or disable motion. The envelope has keyboard-operable summary semantics; the interface also uses labels, status announcements, and focus handling in the form and opening flow.

## 8. Event Configuration

`src/data/event.ts` is the source for event date, time zone, photo-session interval, venue, building, map coordinates/embed, and contact records. `VenueMapPreview.tsx` validates the configured Google Maps embed URL and falls back to its existing approved embed URL. Contact buttons use configured telephone links. The location section currently computes a directions URL, but the map preview component does not render a separate directions action.

Contact names and telephone values are displayed by the application. Confirm their intended public use before deploying the invitation.

## 9. Development and Deployment

Install the lockfile dependencies with `npm ci`. Configure `PRIVATE_GUESTS_JSON` and `NEXT_PUBLIC_FORMSPREE_FORM_ID` in `.env.local` for local work. Keep real values out of Git. `PRIVATE_GUESTS_JSON` must contain the server-side guest records required at build time for personalized static routes.

Available package scripts are `npm run dev`, `npm run lint`, `npm run build`, and `npm run start`. TypeScript can be checked with `npx tsc --noEmit`.

The app is suitable for Vercel hosting, but deployment configuration and production behavior are not verified by this specification. Configure environment variables for the build/runtime context and review the privacy implications of generated personalized routes before deployment.

## 10. Privacy and Security

- `/docs/PRIVATE_GUESTS_51.json`, `/docs/PRIVATE_GUESTS_ENV_LINE.txt`, `.env.local`, and `/guest-links.txt` are ignored by Git. Private guest records belong in restricted local or deployment configuration, not tracked documentation or source.
- `PRIVATE_GUESTS_JSON` is read by server-only guest lookup. The public-prefixed Formspree identifier is intentionally available to the browser; do not place credentials in public-prefixed variables.
- Personalized links are bearer links, not proof of identity. No-index metadata does not make a route private.
- Real guest routes are included by static route generation. Treat generated output, deployment artifacts, and the configured contact details as privacy-sensitive.
- Historical Git commits may retain information even after documentation is removed from the current tree. Removing a file does not erase its history.

## 11. Verification Checklist

Run and review these checks for a release; this checklist does not claim they have passed:

- [ ] `npx tsc --noEmit`
- [ ] `npm run lint`
- [ ] `npm run build` with required environment configuration and font access
- [ ] Personalized route resolution, unknown-slug not-found behavior, and isolation of each guest’s rendered content
- [ ] Vietnamese and English copy, addressing, and language switching
- [ ] Mobile and desktop layouts, keyboard operation, and reduced-motion behavior
- [ ] Map preview, configured contact links, and available/missing audio behavior
- [ ] Form validation and state handling; verify provider delivery only with an approved non-production procedure
