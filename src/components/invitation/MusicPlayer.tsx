'use client';

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import { useInvitationCopy } from './LanguageProvider';

export type MusicHandle = {
  startIfEnabled: () => void;
};

type MusicPlayerProps = {
  ref: Ref<MusicHandle>;
  available: boolean;
};

export default function MusicPlayer({ ref, available }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(true);

  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const copy = useInvitationCopy().music;

  const tryPlay = useCallback(() => {
    if (!available || !enabledRef.current || unavailable) return;

    const audio = audioRef.current;
    if (!audio || !audio.paused) return;

    void audio.play().catch(() => {
      if (audio.paused) setPlaying(false);
    });
  }, [available, unavailable]);

  // Attempt autoplay on every invitation page.
  useEffect(() => {
    tryPlay();
  }, [tryPlay]);

  // Retry when the user opens the envelope.
  useImperativeHandle(ref, () => ({ startIfEnabled: tryPlay }), [tryPlay]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio || unavailable) return;

    if (!audio.paused) {
      enabledRef.current = false;
      audio.pause();
    } else {
      enabledRef.current = true;
      tryPlay();
    }
  }

  if (!available) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/grad-theme.mp3"
        preload="auto"
        loop
        onPlay={() => {
          if (enabledRef.current) {
            setPlaying(true);
          } else {
            audioRef.current?.pause();
          }
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setUnavailable(true);
        }}
      />

      <div className="music-control">
        <button
          type="button"
          onClick={toggle}
          disabled={unavailable}
          aria-pressed={playing}
          aria-label={unavailable ? copy.unavailable : playing ? copy.pause : copy.play}
        >
          {playing ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="m16 9 5 6m0-6-5 6" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
