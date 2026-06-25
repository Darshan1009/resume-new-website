"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { profile } from "@/lib/data";

const Character = lazy(() => import("./Character"));

const Landing = () => {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");
  const [showChar, setShowChar] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasDesktopWidth = window.innerWidth >= 992;
    const hasEnoughMemory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory === undefined ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory as number) >= 3;

    setShowChar(hasDesktopWidth && !reducedMotion && hasEnoughMemory);
  }, []);

  return (
    <section className="landing-section" id="landing">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I&apos;m</h2>
          <h1>
            {firstName}
            <br />
            <span>{lastName}</span>
          </h1>
        </div>

        {showChar && (
          <Suspense fallback={null}>
            <Character />
          </Suspense>
        )}

        <div className="landing-info">
          <h3>A Cybersecurity</h3>
          <h2>
            <span className="li-1">SOC Analyst</span>
            <span className="li-2">Pentester</span>
          </h2>
        </div>

        <div className="landing-meta">
          <span>
            <span className="landing-status-dot" />
            {profile.notice}
          </span>
          <span>
            LOCATION<b>{profile.location}</b>
          </span>
          <span>
            FOCUS<b>SOC · VAPT · THREAT-INTEL</b>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Landing;
