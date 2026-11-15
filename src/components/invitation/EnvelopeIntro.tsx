'use client';

import type { ReactNode } from 'react';
import { useInvitationCopy } from './LanguageProvider';

export type OpeningPhase = 'closed' | 'opening' | 'open';

export default function EnvelopeIntro({
  displayName,
  dateStamp,
  phase,
  onOpen,
  children,
}: {
  displayName: string;
  dateStamp: string;
  phase: OpeningPhase;
  onOpen: () => void;
  children: ReactNode;
}) {
  const copy = useInvitationCopy().intro;
  return (
    <div className="intro-scene">
      <div className="intro-heading">
        <h2 className="intro-title font-display">
          {copy.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="intro-note">{copy.note}</p>
        <span className="intro-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <details className="envelope-disclosure" open={phase === 'open'}>
        <summary
          className="envelope-target"
          role="button"
          aria-label={copy.accessibleOpen}
          aria-disabled={phase === 'opening'}
          onClick={(event) => {
            event.preventDefault();
            if (phase === 'closed') onOpen();
          }}
        >
          <span className="postal-stamp eyebrow" aria-hidden="true">
            {dateStamp}
          </span>
          <span className="envelope">
            <span className="envelope-paper">
              <span className="envelope-name" aria-hidden={phase === 'closed'}>
                {displayName}
              </span>
            </span>
            <span className="envelope-back" aria-hidden="true" />
            <span className="envelope-flap" aria-hidden="true" />
            <span className="envelope-pocket" aria-hidden="true" />
            <span className="envelope-seal" aria-hidden="true">
              ♡
            </span>
          </span>
        </summary>
        {children}
      </details>
    </div>
  );
}
