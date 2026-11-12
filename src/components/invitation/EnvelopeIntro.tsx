"use client";

import type { ReactNode } from "react";
import { editorialContent, siteContent } from "@/data/content";

export default function EnvelopeIntro({ displayName, onOpen, children }: {
  displayName: string;
  onOpen: () => void;
  children: ReactNode;
}) {
  const copy = editorialContent.intro;
  return (
    <details className="envelope-disclosure" onToggle={(event) => {
      if (event.currentTarget.open) onOpen();
    }}>
      <summary className="envelope-summary">
        <span className="eyebrow intro-brand">{siteContent.title}</span>
        <span className="intro-kicker">{copy.eyebrow}</span>
        <span className="envelope">
          <span className="envelope-paper">
            <span className="eyebrow">{copy.note}</span>
            <span className="envelope-name">{displayName}</span>
            <span className="letter-heart" aria-hidden="true">♡</span>
          </span>
          <span className="envelope-pocket" aria-hidden="true" />
          <span className="envelope-seal" aria-hidden="true">H</span>
        </span>
        <span className="button intro-button">{copy.open}<span aria-hidden="true"> ↗</span></span>
      </summary>
      {children}
    </details>
  );
}
