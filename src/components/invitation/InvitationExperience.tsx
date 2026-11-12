"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import EnvelopeIntro, { type OpeningPhase } from "./EnvelopeIntro";
import MusicPlayer, { type MusicHandle } from "./MusicPlayer";

export default function InvitationExperience({ displayName, dateStamp, hasAudio, children }: {
  displayName: string;
  dateStamp: string;
  hasAudio: boolean;
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<OpeningPhase>("closed");
  const mainRef = useRef<HTMLElement>(null);
  const musicRef = useRef<MusicHandle>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (phase !== "open" || !mainRef.current) return;
    mainRef.current.focus({ preventScroll: true });
    const elements = Array.from(mainRef.current.querySelectorAll<HTMLElement>("[data-reveal]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    // Content is visible by default. Only offscreen elements are armed for motion.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.remove("reveal-pending");
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    const showAll = () => {
      if (preference.matches) {
        elements.forEach((element) => element.classList.remove("reveal-pending"));
        observer.disconnect();
      }
    };
    preference.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", showAll);
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, [phase]);

  function openInvitation() {
    musicRef.current?.startIfEnabled(); // Keep playback inside the opening gesture.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("open");
      return;
    }
    setPhase("opening");
    timerRef.current = setTimeout(() => setPhase("open"), 760);
  }

  return (
    <div className="invitation-experience" data-phase={phase}>
      <EnvelopeIntro displayName={displayName} dateStamp={dateStamp} phase={phase} onOpen={openInvitation}>
        <main ref={mainRef} tabIndex={-1} className="invitation-main" aria-label="Graduation invitation">
          {children}
        </main>
      </EnvelopeIntro>
      <MusicPlayer ref={musicRef} available={hasAudio} opened={phase !== "closed"} />
    </div>
  );
}
