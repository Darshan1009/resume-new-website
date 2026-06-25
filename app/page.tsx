"use client";

import { useEffect, useState } from "react";
import Cursor from "@/components/Cursor";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import SocialIcons from "@/components/SocialIcons";
import Landing from "@/components/Landing";
import About from "@/components/About";
import WhatIDo from "@/components/WhatIDo";
import Career from "@/components/Career";
import Work from "@/components/Work";
import Arsenal from "@/components/Arsenal";
import Extras from "@/components/Extras";
import Contact from "@/components/Contact";
import { ResumeProvider } from "@/components/ResumeContext";

const ENTERED_KEY = "ds-sys-entered";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(ENTERED_KEY) === "1") {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canUseCursor = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowCursor(canUseCursor && !reducedMotion);
  }, []);

  const handleDone = () => {
    sessionStorage.setItem(ENTERED_KEY, "1");
    window.scrollTo({ top: 0, behavior: "auto" });
    setLoading(false);
  };

  return (
    <ResumeProvider>
      {loading && <Loading onDone={handleDone} />}
      {!loading && showCursor && <Cursor />}
      <div className={`container-main${loading ? " is-loading" : ""}`}>
        <Navbar />
        <SocialIcons />
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <Arsenal />
        <Extras />
        <Contact />
      </div>
    </ResumeProvider>
  );
}
