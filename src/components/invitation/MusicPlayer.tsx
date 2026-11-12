"use client";

import { useImperativeHandle, useRef, useState, type Ref } from "react";
import { editorialContent } from "@/data/content";

export type MusicHandle = { startIfEnabled: () => void };

export default function MusicPlayer({ ref, available, opened }: {
  ref: Ref<MusicHandle>;
  available: boolean;
  opened: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const desiredRef = useRef(false);
  const attemptRef = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<"off" | "playing" | "paused" | "blocked" | "unavailable">("off");
  const copy = editorialContent.music;

  async function play() {
    if (!audioRef.current || !available || status === "unavailable") return;
    const attempt = ++attemptRef.current;
    desiredRef.current = true;
    try {
      await audioRef.current.play();
    } catch {
      if (attempt === attemptRef.current) {
        desiredRef.current = false;
        setStatus(audioRef.current.error ? "unavailable" : "blocked");
      }
    }
  }

  useImperativeHandle(ref, () => ({
    startIfEnabled() { if (enabled) void play(); },
  }));

  function toggle() {
    if (!opened) {
      setEnabled(!enabled);
    } else if (status === "playing" || desiredRef.current) {
      ++attemptRef.current;
      desiredRef.current = false;
      audioRef.current?.pause();
      setStatus("paused");
    } else {
      void play();
    }
  }

  const label = status === "unavailable" ? copy.unavailable
    : status === "blocked" ? copy.blocked
    : !opened ? (enabled ? copy.on : copy.off)
    : status === "playing" ? copy.pause : copy.play;

  return <>
    <audio
      ref={audioRef}
      src={available ? "/audio/grad-theme.mp3" : undefined}
      preload="none"
      loop
      onPlay={() => {
        if (desiredRef.current) setStatus("playing");
        else audioRef.current?.pause();
      }}
      onPause={() => setStatus((current) => current === "unavailable" ? current : "paused")}
      onError={() => { desiredRef.current = false; setStatus("unavailable"); }}
    />
    {available && <div className="music-control">
      <button type="button" onClick={toggle} disabled={status === "unavailable"} aria-pressed={!opened ? enabled : status === "playing"}>
        <span aria-hidden="true">♫</span> {label}
      </button>
      <span className="sr-only" role="status">{status === "playing" ? "Music playing" : label}</span>
    </div>}
  </>;
}
