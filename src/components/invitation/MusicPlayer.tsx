"use client";

import { useImperativeHandle, useRef, useState, type Ref } from "react";
import { editorialContent } from "@/data/content";

export type MusicHandle = { startIfEnabled: () => void };
type AudioStatus = "off" | "playing" | "paused" | "blocked" | "unavailable";

export default function MusicPlayer({ ref, available, opened }: {
  ref: Ref<MusicHandle>;
  available: boolean;
  opened: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const desiredRef = useRef(false);
  const attemptRef = useRef(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [status, setStatus] = useState<AudioStatus>("off");
  const copy = editorialContent.music;

  async function play() {
    if (!available || !audioRef.current) return;
    const attempt = ++attemptRef.current;
    desiredRef.current = true;
    try {
      await audioRef.current.play();
      if (attempt === attemptRef.current) setStatus("playing");
    } catch {
      if (attempt === attemptRef.current) {
        desiredRef.current = false;
        setStatus(audioRef.current.error ? "unavailable" : "blocked");
      }
    }
  }

  useImperativeHandle(ref, () => ({
    startIfEnabled() { if (soundEnabled) void play(); },
  }));

  function toggle() {
    if (!available || status === "unavailable") return;
    if (!opened) {
      setSoundEnabled((current) => !current);
      return;
    }
    if (soundEnabled && (status === "playing" || desiredRef.current)) {
      ++attemptRef.current;
      desiredRef.current = false;
      audioRef.current?.pause();
      setSoundEnabled(false);
      setStatus("paused");
    } else {
      setSoundEnabled(true);
      void play();
    }
  }

  const playing = status === "playing";
  const soundOn = opened ? playing : soundEnabled;
  const label = status === "unavailable" ? copy.unavailable
    : !opened ? (soundEnabled ? "Turn background music off" : "Turn background music on")
    : playing ? copy.pause
    : status === "blocked" ? copy.blocked
    : copy.play;

  return (
    <>
      <audio
        ref={audioRef}
        src={available ? "/audio/grad-theme.mp3" : undefined}
        preload="metadata"
        loop
        onPlay={() => { if (desiredRef.current) setStatus("playing"); else audioRef.current?.pause(); }}
        onPause={() => { if (!desiredRef.current) setStatus("paused"); }}
        onError={() => { desiredRef.current = false; setStatus("unavailable"); }}
      />
      {available && (
        <div className="music-control">
          <button type="button" onClick={toggle} disabled={status === "unavailable"}
            aria-pressed={soundOn} aria-label={label} title={label}>
            {soundOn ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="m16 9 5 6m0-6-5 6" />
              </svg>
            )}
          </button>
          <span className="sr-only" role="status">{label}</span>
        </div>
      )}
    </>
  );
}
