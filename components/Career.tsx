"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/lib/data";

const Career = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafPending = false;

    const update = () => {
      rafPending = false;
      if (!infoRef.current || !timelineRef.current) return;
      const rect = infoRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const progressed = Math.min(Math.max(vh - rect.top, 0), total + vh * 0.5);
      const pct = Math.min(1, progressed / (total + vh * 0.3));
      timelineRef.current.style.maxHeight = `${pct * 100}%`;
    };

    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="career-section section-container" id="career">
      <div className="career-container">
        <h2 className="career-title">
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info" ref={infoRef}>
          <div className="career-timeline" ref={timelineRef}>
            <span className="career-dot" />
          </div>
          {experience.map((item, i) => (
            <div className="career-info-box" key={i}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                  <div className="career-loc">{item.location}</div>
                  <div className="career-tag">{item.tag}</div>
                </div>
                <h3>{item.period.split(" — ")[1] ?? item.period}</h3>
              </div>
              <p className="career-desc">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
