"use client";

import { useRef, type ReactNode } from "react";
import EnvelopeIntro from "./EnvelopeIntro";
import { editorialContent } from "@/data/content";

export default function InvitationExperience({ displayName, children }: {
  displayName: string;
  children: ReactNode;
}) {
  const mainRef = useRef<HTMLElement>(null);
  return (
    <div className="invitation-experience">
      <EnvelopeIntro displayName={displayName} onOpen={() => {
        mainRef.current?.focus({ preventScroll: true });
      }}>
        <main ref={mainRef} tabIndex={-1} className="invitation-main" aria-label="Graduation invitation">
          {children}
        </main>
      </EnvelopeIntro>
      <div className="intro-music">
        <button className="music-preference" disabled aria-describedby="music-unavailable">♫ {editorialContent.intro.music}</button>
        <small id="music-unavailable">{editorialContent.intro.unavailable}</small>
      </div>
    </div>
  );
}
